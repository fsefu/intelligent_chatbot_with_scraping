const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');
const pool = require("../config/database");
router.post("/", async (req, res) => {
    try {
      const unansQuery = req.body;
      const unanswered_que = unansQuery.data;
      const date = new Date();
      const status = "unanswered"
  
      // Check if the data already exists in the table
      const selectQuery = 'SELECT * FROM unanswered_que WHERE unanswered_que = ?';
      const selectParams = [unanswered_que];
      const [existingData] = await pool.query(selectQuery, selectParams);
  
      if (existingData.length > 0) {
        // Data already exists, do not insert again
        // return res.status(200).json({ message: 'Data already exists' });
        return null;
      }
  
      // Insert the data into the unanswered_que table
      const insertQuery = 'INSERT INTO unanswered_que (unanswered_que, date, status) VALUES (?, ?, ?)';
      const insertParams = [unanswered_que, date, status];
      await pool.query(insertQuery, insertParams);
  
      res.status(200).json({ message: 'Data inserted successfully' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Error inserting data into unanswered_que table' });
    }
  });

module.exports = router;
