const express = require("express");
const productRouter = new express.Router();
const Product = require("../models/product-model");

productRouter.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send("Error while fetching products");
  }
});

productRouter.get("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.status(200).send(product);
  } catch (err) {
    res.status(500).send(err);
  }
});

// FOR DEVELOPMENT USE ONLY, NOT TO BE USED IN PRODUCTION

/* productRouter.delete("/products", async (req, res) => {
  try {
    const products = await Product.deleteMany({});
    res.send("All products deleted");
  } catch (err) {
    res.send(err);
  }
}); */

module.exports = productRouter;
