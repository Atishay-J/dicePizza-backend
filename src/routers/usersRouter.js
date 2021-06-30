const express = require("express");
const router = new express.Router();

const Users = require("../../src/models/usersSchema");

router.post("/signup", async (req, res) => {
  try {
    const addUser = await new Users(req.body);
    const addedUser = addUser.save().then("User Signed Up");
    res.send(addedUser);
  } catch (err) {
    res.send(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const foundUser = await Users.findOne({ username: username });

    if (foundUser) {
      console.log("User found");
      if (foundUser.password === password) {
        console.log("user Authenticated");
        res.send(foundUser);
      }
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
