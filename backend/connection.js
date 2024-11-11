const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost", // or your server's host
  user: "root", // your MySQL username
  password: "Ajaykn@2004", // your MySQL password
  database: "recipe_db",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: ", err);
  } else {
    console.log("Connected to MySQL!");
  }
});

module.exports = db;
// const mysql = require('mysql2');

// const db = mysql.createConnection({
//     host: 'recipe-db.c1qy2ceskxej.eu-north-1.rds.amazonaws.com',
//     user: 'admin',
//     password: 'Ajaykn2004',
//     database: 'recipe_db'
// });

// db.connect((err) => {
//     if (err) {
//         console.error('Error connecting to MySQL: ', err);
//     } else {
//         console.log('Connected to MySQL!');
//     }
// });

// module.exports = db;
