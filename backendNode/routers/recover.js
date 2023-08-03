const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const router = express.Router();

require('dotenv').config();
const pool = require("../config/database");


router.post('/', async(req, res) => {
    const { email } = req.body;
     console.log(email);
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
        email,
    ]);
    const user = rows[0];
    if (!user) {
        console.log("This account not found");
        return res.status(404).message("There is no account With these email");
    }
    // Generate a reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 300000);
    // const resetTokenExpiry = new Date(Date.now() + 3000000);

    console.log(resetTokenExpiry);
    await pool.query('UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?'
    , [resetToken, resetTokenExpiry, email]);


    const transporter = nodemailer.createTransport({
        service: 'gmail', // e.g., Gmail, Outlook
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const date = new Date();
    const monthName = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const sentDate = monthName + ' ' + year;
     console.log(sentDate);

    // Email options
    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: 'Password Reset',
        html: `
      <p>You have recently requested a password reset. We are here to assist you in securing your account. Please follow the instructions below to reset your password: .</p>
      <p>Please click the following link to reset your password:</p>
      <a href="http://localhost:3000/reset-password/change-password/${resetToken}">Reset Password</a>
      <p>Please note that this link will only be valid for the next 5 minutes.</p>
      <p>If you did not request a password reset, please ignore this email. Your account remains secure.</p>
      <p>Best regards,<br>JU Chatbot</p>
      <p>Date:${sentDate}

      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Failed to send password reset email.');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Password reset email sent successfully.');
        }
    });
    console.log("succeeded");
    return res.status(200);
});



module.exports = router;
