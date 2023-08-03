const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const pool = require("../config/database");

router.post("/", async (req, res) => {

  const data = {
    name: 'John Doe',
    age: 30,
    email: 'johndoe@example.com'
  };
  
  const jsonData = JSON.stringify(data, null, 2); // Convert data to JSON string with indentation

  const folderPath = path.join(__dirname, 'data'); // Specify the folder path
  const filePath = path.join(folderPath, 'data.json'); // Specify the file path
  
  fs.mkdirSync(folderPath, { recursive: true }); // Create the folder if it doesn't exist
  
  fs.writeFile(filePath, jsonData, 'utf8', (err) => {
    if (err) {
      // console.error('An error occurred while writing the file:', err);
    } else {
      // console.log('File created successfully!');
    }
  });

});

module.exports = router;
