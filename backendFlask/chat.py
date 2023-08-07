import json
import os
import joblib
import random
from sklearn.feature_extraction.text import TfidfVectorizer
def get_response(msg):
    # Load the trained SVM model
    svm_model = joblib.load('trained/svm_model.joblib')

    # Load the TfidfVectorizer with the same configuration used during training
    vectorizer = joblib.load('trained/vectorizer.joblib')


    # Preprocess and transform user input
    input_vector = vectorizer.transform([msg])

    # Get the predicted responses from the SVM model
    predicted_responses = svm_model.predict(input_vector)

    # Randomly select a predicted response
    random_response = random.choice(predicted_responses)
    folder_path = os.getcwd()
    folder_path = folder_path + "/trainedJson/"+"data.txt"
    with open(folder_path, 'r') as file:
        data = file.readlines()
    data = ''.join(data)
    print("Here is json: ", data)

    with open(data, 'r') as json_data:
        intents = json.load(json_data)

    # Replace with the response you want to search for
    specific_response = random_response 

    matching_intent = None
    for intent in intents['intents']:
        if specific_response in intent['responses']:
            matching_intent = intent
            break

    if matching_intent:
        responses = matching_intent['responses']
        random_response = random.choice(responses)
        
        return random_response
    else:
        print("No matching intent found.")

    # Print the selected predicted response
    print(random_response)

