const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');
const pool = require("../config/database");
router.post("/", async (req, res) => {
      try{
        const answeredid = req.body.data;
        // console.log("This is", answeredid);
        
        const updateQuery = 'UPDATE unanswered_que SET status = ? WHERE id = ?';
        const updateParams = ['answered', answeredid];
        
        // Assuming you have a database connection object named 'dbConnection'
        pool.query(updateQuery, updateParams, (error, result) => {
          if (error) {
            // console.error('Error updating the unanswered_que table:', error);
            // Handle the error appropriately
          } else {
            // console.log('Successfully updated the unanswered_que table.');
            // Handle the successful update
          }
        });
   
      }
      catch (err) {
        // console.log(err);
        res.status(500).json({ message: 'Error when answering question' });
      }
 }
);

module.exports = router;
