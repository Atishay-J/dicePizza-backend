const express = require("express");
const app = express();
const cors = require("cors");
const fillProductsCollection = require("./utils/databaseInit");
const productRouter = require("./routers/productRouter");

require("dotenv").config();
require("./database/conn");

app.use(cors());
app.use(express.json());
app.use("/api", productRouter);

//** To be used once for flooding product data **
// fillProductsCollection();

app.get("/", (req, res) => {
  res.send("dicePizza API server is running");
});

app.listen(process.env.PORT || 8000, () =>
  console.log("Server Started on Port 8000")
);
