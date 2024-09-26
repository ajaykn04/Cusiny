const db = require('../connection');

// Add a new user
const addUser = (user, callback) => {
    const sql = 'INSERT INTO users (username, email, place, age, password, admin) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [user.username, user.email, user.place, user.age, user.password, user.admin];
    db.query(sql, values, (err, result) => {
        if (err) return callback(err);
        callback(null, result);
    });
};

// Get all users
const getAllUsers = (callback) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

// Get a user by email and password
const getUserByEmailAndPassword = (email, password, callback) => {
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, result) => {
        if (err) return callback(err);
        callback(null, result[0]);
    });
};

module.exports = {
    addUser,
    getAllUsers,
    getUserByEmailAndPassword
};
