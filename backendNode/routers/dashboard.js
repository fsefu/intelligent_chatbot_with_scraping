
const express = require('express');
const router = express.Router();
const pool = require("../config/database");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {

  try {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    // Get user input
    // const token = localStorage.getItem('token');
    const data = req.body;
    // console.log("this is token from nodejs: ", data);
    const decoded = jwt.decode(data.token);
    // console.log("Decoded token: ",decoded.email);
    const email = decoded.email;
    const uid = decoded.user_id;
    if(email && uid ){
      const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
        email,
      ]);
      const user = rows[0];
    //  console.log("this is user:>> ", user);

     if(uid === user.id){
      //  console.log("success");
       return res.status(200).json({ message: 'success' });
      // res.status(200);

      // return res.status(200)
     }
     else{
      return res.status(400).send("Invalid Credentials");
     }
    }
    else{
      return res.status(400).send("Invalid Credentials");
    }

    
    // return res.status(400).send("Invalid Credentials");
  } 
  catch (err) {
    // console.log(err);
  }
});
module.exports = router;