
const express = require('express');
const router = express.Router();
const pool = require("../config/database");

router.get("/", async (req, res) => {
  try{
    req.session.setemail = "email@gmail.com";
    req.session.setpassword = "1234";
    res.send("Cookies is set succeesfully");
  }
  catch (err) {
    console.log(err);
  }
});
module.exports = router;