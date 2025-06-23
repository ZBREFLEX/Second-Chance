const mysql = require("mysql2/promise");
require("dotenv").config();

const db = mysql.createPool({
  host: "sql12.freesqldatabase.com",
  user: "sql12786354",
  password: "6By9nsFXJU", // default XAMPP password
  database: "sql12786354",
});

module.exports = db;
