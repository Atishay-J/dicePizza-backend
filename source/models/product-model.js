const { response } = require("express");
const express = require("express");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  isVeg: {
    type: Boolean,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Product = new mongoose.model("Product", productSchema);
module.exports = Product;
