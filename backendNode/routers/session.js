const express = require('express');
const router = express.Router();
const session = require('express-session');
// const { model } = require('mongoose');

router.use(session({
    secret: process.env.TOKEN_KEY,
    resave: false,
    saveUninitialized: true,
  }));

router.get("/", async (req, res) => {
  try{
    req.session.email = "email@gmail.com";
    req.session.password = "1234";
    // const { email, password } = req.session;
    res.send("You have stored session successfully");
  }
  catch (err) {
    console.log(err);
  }
});

module.exports = router;