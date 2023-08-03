const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const router = express.Router();
require('dotenv').config();
const pool = require("../config/database");
const bcrypt = require("bcryptjs");

router.post('/', async (req, res) => {
    console.log("Is workin");
    // const { token } = req.params;
    let code = req.originalUrl.split('/');
    code = code[code.length -1];
    console.log(code);
    const token = code;
    console.log(req.body)
    const { newpassword } = req.body;
    const {confirmpassword} = req.body;
    console.log("New pass: ", newpassword, "  ", "Confirm Pass ", confirmpassword);
    if(!(newpassword && confirmpassword)){
        return res.status(409).send("Confirm password and New Password are different");
    }
//    let email = ''
    try {
        const [rows] = await pool.query(
            "SELECT email FROM users WHERE reset_token = ? AND reset_token_expiry > NOW()",
            [token]
        );
        if (rows.length === 0) {
            console.log("Invalid or expired reset token.");
            return res.status(404).send("Invalid or expired reset token.");
        }
        const encryptedUserPassword = await bcrypt.hash(newpassword, 10);

       const  { email } = rows[0];
       await pool.query(
        "UPDATE users SET password = ? WHERE email = ?",
        [encryptedUserPassword, email]);

        await pool.query(
            "UPDATE users SET reset_token = NULL, reset_token_expiry = NULL WHERE email = ?",
            [email]
        );

        res.send('Password reset successful.');
    } catch (error) {
        console.error("Error retrieving user email:", error);
        res.status(500).send('Failed to retrieve user email.');
    }
  
});

module.exports = router;