const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');
const pool = require("../config/database");
router.post("/", async (req, res) => {
    try {
    //   const unansQuery = req.body;
    //   const unanswered_que = unansQuery.data;
    //   const date = new Date();
    //   const status = "unanswered"
     const feedbacks = req.body;
   //   console.log("Here is feedback>> ",feedbacks);
     const date = new Date();
     let liked = 0;
     let disliked = 0;
     let incorrect =0;
     let dontUnderstand = 0;
     let unclear = 0;
     let feedback = "null";
     
     if(feedbacks.liked){
        liked = 1
     }
     if(feedbacks.disliked){
        disliked = 1;
     }
     if(feedbacks.incorrect){
      incorrect = 1;
     }
     if(feedbacks.dontUnderstand){
        dontUnderstand = 1;
     }
     if(feedbacks.unclear){
        unclear = 1;
     }
     if(feedbacks.feedbackInput !== ''){
        feedback = feedbacks.feedbackInput;
     }
     const insertQuery = 'INSERT INTO feedback_table (feedback, date, liked, disliked, incorrect, dontUnderstand, unclear) VALUES ( ?, ?,?,?,?,?,?)';
     const insertParams = [feedback, date, liked, disliked, incorrect, dontUnderstand, unclear];
     await pool.query(insertQuery, insertParams);

    }
     catch (err) {
      // console.log(err);
      res.status(500).json({ message: 'Error inserting data into unanswered_que table' });
    }
  
}
  );

module.exports = router;
