const mysql = require("mysql2");
const db = require("../connection");

const userSchema = {
  _id: {
    type: "int",
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: "varchar",
    length: 255,
    notNull: true,
  },
  email: {
    type: "varchar",
    length: 255,
    notNull: true,
    unique: true,
  },
  place: {
    type: "varchar",
    length: 255,
  },
  age: {
    type: "int",
  },
  password: {
    type: "varchar",
    length: 255,
    notNull: true,
  },
  admin: {
    type: "boolean",
    default: false,
  },
};

module.exports = userSchema;
