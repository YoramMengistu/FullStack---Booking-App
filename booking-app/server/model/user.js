const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

require;
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 2,
    max: 255,
    required: true,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
});

const User = mongoose.model("User", userSchema, "users");

module.exports = {
  User,
};
