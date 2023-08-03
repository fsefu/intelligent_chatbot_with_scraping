
require("dotenv").config();
const express = require("express");
const cors = require('cors');
const login = require('./routers/login');
const register = require("./routers/register");
const dashboard = require('./routers/dashboard');
const unsansQuery = require('./routers/unansQuery');
const get_data = require('./routers/get_data');
const feedback = require("./routers/feedback");
const  json_creator = require("./routers/json_creator");
const answer_updater = require("./routers/answer_updater");
const profile_update = require("./routers/profile_update")
const recover = require("./routers/recover");
const reset = require("./routers/reset");

const session = require('express-session');

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use("/login", login);
app.use("/dashboard", dashboard);
app.use("/register", register);
app.use("/unsansQuery", unsansQuery);
app.use("/feedback", feedback);
app.use("/get_data", get_data);
app.use("/json_creator",json_creator);
app.use("/answer_update", answer_updater);
app.use("/profile_update",profile_update);
app.use('/reset-password/change-password/*', reset)
app.use("/reset-password", recover)
// app.use("/reset-password/*", reset)
app.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});

module.exports = app;
