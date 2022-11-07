// const {Sequelize} = require('sequelize');
const mysql = require("mysql2");
require('dotenv').config();


const connection = mysql.createConnection({
  host: "localhost",
  // Your username
  user: "root",
  // Your password
  password: process.env.DB_PASSWORD,
  database: "employees"
});

connection.connect(function (err) {
  if (err) throw err;
});

// let sequelize;

// if (process.env.JAWSDB_URL) {
//   sequelize = new Sequelize(process.env.JAWSDB_URL);
// } else {
//   sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//       host: 'localhost',
//       dialect: 'mysql',
//       port: 3306
//     }
//   );
// }

module.exports = connection;