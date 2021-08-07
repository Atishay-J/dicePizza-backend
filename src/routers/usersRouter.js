const express = require("express");
const bcrypt = require("bcrypt");

const router = new express.Router();
const Users = require("../../src/models/usersSchema");

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const isUsernameTaken = await Users.findOne(
      { username: username } || { email: username }
    );
    if (isUsernameTaken) {
      return res.status(404).send("username not available");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const addUser = await new Users({ username, password: hashedPassword });
    const addedUser = await addUser.save();

    res.status(200).send("User Created");
  } catch (err) {
    res.send(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const foundUser = await Users.findOne(
      { username: username } || { email: username }
    );

    if (foundUser) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        foundUser.password
      );

      const { address, cart, favourites, _id, username } = foundUser;

      return isPasswordCorrect
        ? res.status(200).json({ address, cart, favourites, _id, username })
        : res.status(401).send("Unauthorised");
    }

    res.status(401).send("Not Found");
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/addproduct", async (req, res) => {
  try {
    const { userId, ...product } = req.body;
    const findUser = await Users.findById(userId);
    findUser.cart.push({ ...product, qty: 1 });
    findUser.save();
    res.status(200).send("Product added");
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/updateqty", async (req, res) => {
  try {
    const { userId, productId, qty, type } = req.body;

    if (type === "DECREMENT" && qty <= 1) {
      await Users.updateOne(
        { _id: userId },
        { $pull: { cart: { id: productId } } }
      );

      return res.status(200).send("Updated");
    }

    if (type === "DECREMENT") {
      await Users.update(
        { _id: userId, "cart.id": productId },
        {
          $set: {
            "cart.$.qty": qty - 1,
          },
        }
      );
      res.status(200).send("Updated");
    }
    if (type === "INCREMENT") {
      await Users.update(
        { _id: userId, "cart.id": productId },
        {
          $set: {
            "cart.$.qty": qty + 1,
          },
        }
      );
      res.status(200).send("Updated");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/updatefavourites", async (req, res) => {
  try {
    let { userId, id, ...product } = req.body;
    let findUser = await Users.findById(userId);
    let alreadyFavourite = findUser.favourites.find((item) => item.id === id);
    console.log("\n \n THissss\n ", userId, id);
    if (alreadyFavourite) {
      console.log("\n \n Already favourite \n ", alreadyFavourite);
      await Users.updateOne(
        { _id: userId },
        { $pull: { favourites: { id: id } } }
      );
      return res.status(200).send("Updated");
    }
    findUser.favourites.push({ id, ...product });
    findUser.save();
    res.status(200).json({ userId, product, findUser, alreadyFavourite });
  } catch (err) {
    console.log("Error while updating favourites", err);
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const findUser = await Users.findById(id).then(console.log("Users found"));
    res.send(findUser);
  } catch (err) {
    res.send(err);
  }
});

router.post("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUser = await Users.findByIdAndUpdate(
      id,
      { $push: req.body },
      { new: true }
    );
    res.send(updatedUser);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
