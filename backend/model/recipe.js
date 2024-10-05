const mysql = require('mysql2');
const db = require('../connection');

const recipeSchema = {
    _id: {
        type: 'int',
        primaryKey: true,
        autoIncrement: true
    },
    owner: {
        type: 'int',
        notNull: true // Foreign key to user._id
    },
    ownername: {
        type: 'varchar',
        length: 255,
        notNull: true
    },
    name: {
        type: 'varchar',
        length: 255,
        notNull: true
    },
    ingredients: {
        type: 'text',
        notNull: true
    },
    instructions: {
        type: 'text',
        notNull: true
    },
    category: {
        type: 'varchar',
        length: 255
    },
    image: {
        type: 'varchar',
        length: 255
    },
    rating: {
        type: 'float',
        default: 0
    }
};

module.exports = recipeSchema;
