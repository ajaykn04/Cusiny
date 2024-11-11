const mysql = require("mysql2");
const db = require("../connection");

const reviewSchema = {
  _id: {
    type: "int",
    primaryKey: true,
    autoIncrement: true,
  },
  recipe_id: {
    type: "int",
    notNull: true,
  },
  user_id: {
    type: "int",
  },
  username: {
    type: "varchar",
    length: 255,
    notNull: true,
  },
  rating: {
    type: "int",
    notNull: true,
  },
  comment: {
    type: "text",
  },
};

module.exports = reviewSchema;
