const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // or your MySQL username
    password: 'Ajaykn@2004', // or your MySQL password
    database: 'cusiny_db' // Your MySQL database name
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL!');
    }
});

module.exports = db;
