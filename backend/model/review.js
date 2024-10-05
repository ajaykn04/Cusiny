const mysql = require('mysql2');
const db = require('../connection');

const reviewSchema = {
    _id: {
        type: 'int',
        primaryKey: true,
        autoIncrement: true
    },
    recipe_id: {
        type: 'int',
        notNull: true // Foreign key to recipe._id
    },
    user_id: {
        type: 'int' // Foreign key to user._id
    },
    username: {
        type: 'varchar',
        length: 255,
        notNull: true
    },
    rating: {
        type: 'int',
        notNull: true
    },
    comment: {
        type: 'text'
    }
};

module.exports = reviewSchema;
