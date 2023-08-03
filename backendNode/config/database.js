const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;


// exports.connect = () => {
//   // Creating a MySQL connection pool
//   const pool = mysql.createPool({
//     host: MYSQL_HOST,
//     user: MYSQL_USER,
//     password: MYSQL_PASSWORD,
//     database: MYSQL_DATABASE,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
//   });

//   // Testing the MySQL connection
//   pool.getConnection((error, connection) => {
//     if (error) {
//       console.error('Database connection failed:', error);
//       process.exit(1);
//     } else {
//       console.log('Successfully connected to database');
//       connection.release();
//     }
//   });

//   return pool;
// };



/*
const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};

*/
