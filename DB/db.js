const mysql = require('mysql');
const conn = mysql.createConnection({
 host: "localhost",
 user: "root",
 password: "", 
 database: "cars-reservation",
});

conn.connect();

module.exports = conn;

