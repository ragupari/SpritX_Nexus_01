const mysql = require('mysql');
require('dotenv').config();

// Create a connection pool
const pool = mysql.createPool({
    connectionLimit: 10, // Set your own connection limit
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

console.log('Connected to database');

// Export the pool to be used in your routes
module.exports = pool;
