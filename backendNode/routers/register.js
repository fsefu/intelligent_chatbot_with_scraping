
const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');
const pool = require("../config/database");

router.post("/", async (req, res) => {
    try {
      // Get user input
  
      const { username, email, password } = req.body;
      console.log(req.body);
      console.log(username, email, password);
    //   console.log(req.body);
      // Validate user input
      if (!(email && password && username)) {
        res.status(400).send("All input is required");
      }
  
      // check if user already exist
      // Validate if user exist in our database
      // const [rows] = await pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', ['John Doe', 'john@example.com', 'password123']);
      console.log("still okay above R^R")
  
      const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
        email,
      ]);
      console.log("still okay &&&*^&R^R")
  
      if (rows.length) {
        return res.status(409).send("User Already Exist. Please Login");
      }
  
      //Encrypt user password
      const encryptedUserPassword = await bcrypt.hash(password, 10);
  
      // Create user in our database
      const newUser = {
        id : uuidv4(),
        username: username,
        email: email,
        password: encryptedUserPassword,
      };
      await pool.query("INSERT INTO users SET ?", [newUser]);
  
      // Create token
      const token = jwt.sign(
        { user_id: newUser.id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "5h",
        }
      );
  
      // save user token
      await pool.query("UPDATE users SET token = ? WHERE id = ?", [token, newUser.id]);
      // return new user
      newUser.token = token;
      // console.log("this is token:>> ",newUser.token);
      return res.status(200).json(newUser.token);

    //   return res.status(200).json(data);

    //   res.status(201).json(data);
    } catch (err) {
      console.log(err);
    }
  });
  
  module.exports = router;