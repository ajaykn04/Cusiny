const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'recipe-db.c1qy2ceskxej.eu-north-1.rds.amazonaws.com',
    user: 'admin', 
    password: 'Ajaykn2004', 
    database: 'recipe_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ', err);
    } else {
        console.log('Connected to MySQL!');
    }
});

// mysql -h recipe-db.c1qy2ceskxej.eu-north-1.rds.amazonaws.com -P 3306 -u admin -p recipe_db

module.exports = db;
