const express = require("express");
const bcrypt = require("bcrypt");

const router = new express.Router();
const Users = require("../../src/models/usersSchema");

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
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
    const foundUser = await Users.findOne({ username: username });

    if (foundUser) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        foundUser.password
      );

      return isPasswordCorrect
        ? res.status(200).send("Authorised")
        : res.status(401).send("Unauthorised");
    }

    res.status(401).send("Not Found");
  } catch (err) {
    res.status(500).send(err);
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
