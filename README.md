# intelligent_chatbot_with_scraping
Overview
This repository contains the codebase for an Intelligent Chatbot With Scraping, designed to interact with users and external entities to achieve specific goals. The chatbot analyzes user queries, retrieves relevant information, and generates appropriate responses. It also allows users to provide feedback on the accuracy and helpfulness of responses, which can be used for further analysis and improvement. Additionally, the chatbot system enables the administrator to manage unanswered queries, update the dataset, train the chatbot model, and maintain the security of their account.

**Technologies Used**

Front-end: React
Back-end: Flask (Python) and Node.js (JavaScript)
Database: MySQL

**Getting Started**

To deploy and run the Intelligent Chatbot, follow these steps:
1. Clone the repository to your local machine by using go to project directories`git clone https://github.com/fsefu/intelligent_chatbot_with_scraping && cd intelligent_chatbot_with_scraping`
   
2. Set up the flask back-end server:
   - Navigate to the 'backendFlask' directory and install the required Python packages using `pip install -r requirements.txt`.
   - Run the Flask server using python app.py.

3.  Set up the node back-end server:
   - Navigate to the 'backendNode' directory and install the required Node packages using `npm install`.
   - Run the Node server using `nodemon index.js`.
4. Set up the React front-end server:
   - Navigate to the 'frontend' directory and install the required Node packages using `npm install` or `yarn`.
   - Run the React server using `npm start` or `yarn start`.

**Project Structure:**
```
- backendFlask
  - data
  - models
  - status
  - trained
  - trainedJson

- backendNode
  - config
  - middleware
  - routers

- frontend
  - public
    - images
  - src
    - components
      - Answer
      - Card
      - Cards
      - CustomerReview
      - Dialog
      - inputField
      - Login
      - MainDash
      - Profiles
      - Query
      - Recovery
      - RigtSide
      - Table
      - Time
      - Updates
    - Data
    - imgs

```

