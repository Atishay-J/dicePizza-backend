const { response } = require("express");
const Product = require("../models/product-model");
const data = require("../utils/products-data");

const prod = data.map((item) => {
  let prodTitle = `${item.name} ${
    item.isVeg ? item.vegIngredients : item.nonVegIngredients
  } ${item.generalIngredients} ${item.verbs} Pizza`;

  return {
    title: prodTitle,
    price: item.price,
    isVeg: item.isVeg,
    rating: item.ratings,
    image: item.pizzaImages,
  };
});

// USE THIS TO FILL PRODUCTS IN DATABASE

const fillProductsCollection = () => {
  prod.forEach(async (product) => {
    try {
      const newProduct = new Product(product);
      const insertedData = await newProduct
        .save()
        .then(console.log("New Product Save to DB"));
    } catch (err) {
      res.status(500).send(err);
      console.log("Error while flooding product Data", err);
    }
  });
};

module.exports = fillProductsCollection;
