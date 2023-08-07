import datetime
import time
import MySQLdb
from flask import Flask, request, jsonify, session
from flask_cors import CORS, cross_origin
from flask import Flask, jsonify, redirect, request, session, url_for
import numpy as np
import torch
from chat import get_response
from models.news import news
from models.event import events
from models.database import get_db_connection
from flask_cors import CORS
from flask_mysqldb import MySQL
from datetime import datetime
import torch.nn as nn
from train import trainer
from torch.utils.data import Dataset, DataLoader
from sklearn.model_selection import train_test_split, KFold
import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split, KFold, GridSearchCV
from sklearn.preprocessing import LabelEncoder
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import nltk
import joblib



from nltk_utils import bag_of_words, tokenize, stem
from model import NeuralNet

import json
import re
import os

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['UPLOAD_FOLDER'] = '/media/safety/OS/dev3/chatbot/backend/data'
app.config['MYSQL_HOST'] = '127.0.0.1'
app.config['MYSQL_USER'] = 'safe'
app.config['MYSQL_PASSWORD'] = '1234'
app.config['MYSQL_DB'] = 'safedb'

mysql = MySQL(app)


@app.get("/get_data")
def get_data():

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM feedback_table')
    data = cursor.fetchall()
    print(data)
    return


@app.post("/predict")
def predict():
    text = request.get_json().get("message")
    response = get_response(text)
    with open("status/server.txt", "r") as file:
        description = file.read()
    name = "Server News"
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    dates = datetime.now()
    cursor.execute('UPDATE updates SET description = %s, dates = %s WHERE name = %s', (description,dates, name))
    mysql.connection.commit()
    
    with open("status/server_events.txt", "r") as file:
        description = file.read()
    name = "Server Events"
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    dates = datetime.now()
    cursor.execute('UPDATE updates SET description = %s, dates = %s WHERE name = %s', (description,dates, name))
    mysql.connection.commit()
    
    message = {"answer": response}

    if response == "news123":
        message = {"news": news()}
        
        if(news()[0]['connection'] == 'no'):
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute('SELECT id FROM updates WHERE name="Server News" LIMIT 1')
            result = cursor.fetchone()

            if result is None:
                type = "Server Down"
                name="Server News"
                description = "Server Unavailable: JU server is down. Users unable to access updated News."
                solved= 'false'
                dates = datetime.now()
                cursor.execute("INSERT INTO updates (id, type, name, description, solved, dates ) VALUES (NULL,% s, % s, % s, % s, % s)",
                (type, name, description, solved, dates))
                mysql.connection.commit()
        else:
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute('SELECT id FROM updates WHERE name="Server News" LIMIT 1')
            result = cursor.fetchone()
            if result is not None:
                uid = result['id']
                delete_query = "DELETE FROM updates WHERE id = %s"
                cursor.execute(delete_query, (uid,))
                mysql.connection.commit()
                
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute('SELECT id FROM updates WHERE name="Server News" LIMIT 1')
            result = cursor.fetchone()
            
            if result is None:
                description = "no"
                with open("status/link_news.txt", "r") as file:
                    description = file.read()
                type = "Broken Class"
                name="Broken News"
                solved= 'false'
                dates = datetime.now()
                cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                cursor.execute('UPDATE updates SET description = %s, dates = %s WHERE name = %s', (description,dates, name))
                mysql.connection.commit()

        return jsonify(message)
    if response == "event123":
        message = {"events": events()}
        
        if(events()['connection'] == 'no'):
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute('SELECT id FROM updates WHERE name="Server Events" LIMIT 1')
            result = cursor.fetchone()

                
        else:
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            description = "no"
            with open("status/link_events.txt", "r") as file:
                description = file.read()
            type = "Server Down"
            name="Broken Events"
            dates = datetime.now()
            cursor.execute('UPDATE updates SET description = %s, dates = %s WHERE name = %s', (description,dates, name))
            mysql.connection.commit()
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute('SELECT id FROM updates WHERE name="Server Events" LIMIT 1')
            result = cursor.fetchone()
            if result is not None:
                uid = result['id']
                delete_query = "DELETE FROM updates WHERE id = %s"
                cursor.execute(delete_query, (uid,))
                mysql.connection.commit()
                
        return jsonify(message)
        
    if response == "Sorry,I can only help you with questions related to jimma University":
        message = {"unanswered": response, "unansweredQue": text}
        return jsonify(message)

    return jsonify(message)


@app.route('/json_file', methods=['POST'])
def handle_json_file():
    file = request.files['file']
    filename = file.filename
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)
    return 'File received and saved'

@app.route('/train', methods=['POST'])
def train_bot():
    print("before train")
    folder_path = os.getcwd()
    #Here is where i to fetch name column  from table updates column type = "Training" and its id is max
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT name FROM updates WHERE type="Training" AND solved="false" ORDER BY id DESC LIMIT 1')
    result = cursor.fetchone()
    if result is None:
        return jsonify({"message": "No training data found"}), 404

    training_file = result["name"]
    print("Training file:", training_file)
    
    #Train after this
    with open(folder_path + "/data/" + training_file, 'r') as file:
        data = json.load(file)

    intents = data['intents']
    dialogs = []
    labels = []

    lemmatizer = WordNetLemmatizer()
    stop_words = set(stopwords.words('english'))

    for intent in intents:
        patterns = intent['patterns']
        responses = intent['responses']

        for pattern in patterns:
            pattern = pattern.lower()  # Lowercasing
            words = nltk.word_tokenize(pattern)
            words = [lemmatizer.lemmatize(word) for word in words if word not in stop_words]  # Lemmatization and removing stop words
            processed_pattern = ' '.join(words)
            
            dialogs.append(processed_pattern)
            labels.append(responses[0])  # Use only the first response

    # Step 2: Feature Extraction
    vectorizer = TfidfVectorizer(ngram_range=(1, 2))  # TF-IDF vectorization with N-grams
    X = vectorizer.fit_transform(dialogs)

    # Save the trained vectorizer
    joblib.dump(vectorizer, 'trained/vectorizer.joblib')

    # Step 3: Split Data into Training and Testing Sets
    X_train, X_test, y_train, y_test = train_test_split(X, labels, test_size=0.2, random_state=42)

    # Step 4: Hyperparameter Tuning
    param_grid = {
        'C': [0.1, 1, 10],
        'kernel': ['linear', 'rbf'],
        'gamma': [0.1, 0.01, 0.001]
    }

    svm_model = SVC(class_weight='balanced')

    # Adjust the number of cross-validation splits
    n_splits = 5  # Set the desired number of splits

    # Use KFold with the updated n_splits
    cv = KFold(n_splits=n_splits)

    grid_search = GridSearchCV(svm_model, param_grid, cv=cv)
    grid_search.fit(X_train, y_train)

    best_model = grid_search.best_estimator_

    # Step 5: Model Evaluation
    y_pred = best_model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"Accuracy: {accuracy}")

    # Step 6: Save the Trained Model
    joblib.dump(best_model, 'trained/svm_model.joblib')

    cursor = mysql.connection.cursor()
    cursor.execute('UPDATE updates SET solved = %s WHERE name = %s', ('true', training_file))
    mysql.connection.commit()
    trainedJsonPath = folder_path + "/data/" + training_file
    trainedJson = folder_path + "/trainedJson/"
    
    with open(trainedJson+'data.txt', 'w') as file:
        file.write(trainedJsonPath)
        
    status = "ok"
    
    return jsonify(status), 200
    
    
@app.route('/merge_json', methods=['POST'])
def merge_route():
    try:
        json_files = []
        sorted_json_files = []

        folder_path = "/media/safety/OS/dev3/chatbot/backendFlask/data"
        for file in os.listdir(folder_path):
            if file.endswith(".json"):
                json_files.append(file)

        def sort_by_number(name):
            # Split the name into parts: non-digits and digits
            parts = re.split(r'(\d+)', name)
            return [int(part) if part.isdigit() else part for part in parts]

        sorted_json_files = sorted(json_files, key=sort_by_number)
        print(sorted_json_files)
        lastVersion = sorted_json_files[-1]
        print(lastVersion)

        filename = lastVersion[0:8]
        versionNumb = lastVersion[8:-5]
        versionNumb = int(versionNumb)
        latestVersionNumb = str(versionNumb + 1)
        lastVersionFileName = filename + latestVersionNumb

        data = request.get_json()
        data = data["data"]
        data = json.loads(data)

        folder_path = '/media/safety/OS/dev3/chatbot/backendFlask/data/'

        with open(folder_path + lastVersion, 'r') as file:
            existing_data = json.load(file)

        merged_intents = existing_data['intents'] + [data]

        existing_data['intents'] = merged_intents

        with open(folder_path + lastVersionFileName + '.json', 'w') as file:
            json.dump(existing_data, file, indent=4)

        status = {'status': 'success', 'message': 'JSON merged successfully'}
        latestJson = lastVersionFileName + ".json"
        try:

            type = "Training"
            name = latestJson
            description = "There is new data available that needs to be incorporated into the training process. I kindly request your assistance in providing the necessary training."
            solved = "false"
            dates = datetime.now()
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

            cursor.execute("INSERT INTO updates (id, type, name, description, solved, dates ) VALUES (NULL,% s, % s, % s, % s, % s)",
              (type, name, description, solved, dates))

            mysql.connection.commit()
        except Exception as e:
            print("Error:", e)

        return jsonify(status), 200

    except json.decoder.JSONDecodeError:
        status = {'status': 'error', 'message': 'Invalid JSON format'}
        return jsonify(status), 400

    except Exception as e:
        status = {'status': 'error', 'message': str(e)}
        return jsonify(status), 500


def jsonSetter():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT name FROM updates WHERE type="Training" AND solved="true" ORDER BY id DESC LIMIT 1')
    result = cursor.fetchone()
    if result is None:
        return jsonify({"message": "No training data found"}), 404

    lastTrainedJson = result["name"]
    print("Training file:", lastTrainedJson)
    return lastTrainedJson

def training(latetsJson):
   
    type = "training"
    name = latetsJson
    description = "There is new data available that needs to be incorporated into the training process. I kindly request your assistance in providing the necessary training."
    solved = "false"
    dates = datetime.now()
    print(dates)
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('INSERT INTO accounts VALUES \
    (NULL, % s, % s, % s, % s, % s, % s)',
    (type, name, description, solved, dates,))
    
    mysql.connection.commit()

    return redirect("http://localhost:3000/admin")
