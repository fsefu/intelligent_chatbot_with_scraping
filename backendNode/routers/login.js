
const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/database");

router.post("/", async (req, res) => {
    try {
      // Get user input
      const { email, password } = req.body;
  
      // Validate user input
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
  
      // Validate if user exist in our database
      const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
        email,
      ]);
      const user = rows[0];
      // console.log("Here is fetched user :", user);
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user.id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: Number.MAX_SAFE_INTEGER,
          }
        );
       
        // save user token
        await pool.query("UPDATE users SET token = ? WHERE id = ?", [token, user.id]);
        // console.log(email , " ", user.password);
          if (email && user && user.password) {
            // req.session.email = email;
            // req.session.password = user.password;
            // console.log("Session is succeeded");
          } else {
            // handle the case where email or user object is undefined
          }
        // req.session.token = token;
        
        user.token = token;
        return res.status(200).json(user);
      }
      return res.status(400).send("Invalid Credentials");
    } catch (err) {
      // console.log(err);
    }
  });
  
  module.exports = router;