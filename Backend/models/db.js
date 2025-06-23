const mysql = require("mysql2/promise");
require("dotenv").config();

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "", // default XAMPP password
  database: "drug_monitor",
});

module.exports = db;
