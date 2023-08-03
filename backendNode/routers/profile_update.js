
const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');
const pool = require("../config/database");

router.post("/", async (req, res) => {
    try {
      // Get user input
      const { token, oldpass, newpass, confirmpass } = req.body;
      console.log(req.body);
      let email;
    //   const token = localStorage.getItem('token');
      const decodedToken = jwt.decode(token);

      if (decodedToken && decodedToken.email) {
         email = decodedToken.email;
        console.log("Here is requested user: ",email);
        // Use the email as needed in your code
      } else {
        console.log('Invalid token or missing email claim');
      }

    //    console.log()
      if (!(email && oldpass && newpass && confirmpass)) {
        console.log("All Data are required");
        return res.status(403).send("All input is required");
      }
  
      const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
        email,
      ]);
      const user = rows[0];
      console.log("Here is fetched user :", user);

      if(!(confirmpass === newpass)){
        console.log("You have Entered Different New Password and Confirm New Password")
        return res.status(402).send("You have Entered Different New Password and Confirm New Password");
      }

      if (user && (await bcrypt.compare(oldpass, user.password))) {
        const encryptedUserPassword = await bcrypt.hash(newpass.toString(), 10);
        const uid = uuidv4();
        console.log("New ID: ",uid)
        // console.log(uid);

        const update = [encryptedUserPassword,uid, email]; // Assuming `userId` is the value of the new id
        await pool.query('UPDATE users SET password = ?, id = ? WHERE email = ?', update);

        console.log("Here also okay");

        const token = jwt.sign(
          { user_id: uid, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: Number.MAX_SAFE_INTEGER,
          }
        );
       
        await pool.query("UPDATE users SET token = ? WHERE id = ?", [token, user.id]);
        console.log(email , " ", user.password); 
        user.token = token;
        return res.status(200).json(user);
      }
      return res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
  });
  
  module.exports = router;