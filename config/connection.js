const mysql = require("mysql2");
require('dotenv').config();

// Database Connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "employees_db"
});

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;