'use strict';
const mysql = require('mysql2');
require('dotenv').config();

// use connection pool so that it is not lost connection
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  secretOrKey: process.env.JWT_SECRET,
});

module.exports = pool;