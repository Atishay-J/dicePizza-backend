const mongoose = require("mongoose");
const express = require("express");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  favourites: {
    type: [],
    default: [],
  },
  cart: {
    type: [],
    default: [],
  },
  address: {
    type: [],
    default: [],
  },
});

const Users = new mongoose.model("Users", UserSchema);

module.exports = Users;
