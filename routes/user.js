const router = require("express").Router();
const User = require("../models/user.model");

// Gets users from database
router.route("/").get((req, res) => {
  User.find()
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Adds a new user to the userDB
router.route("/signup").post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  const newUser = new User({
    username,
    password,
    email,
  });

  newUser
    .save()
    .then(() => res.json("User added to userDB"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Adds a new todoList for the current user
router.route("/update").post((req, res) => {
  console.log(req.body);
  const userId = req.body.id;

  const newTodoList = {
    title: req.body.title,
    content: req.body.content,
  };

  // Finds user and updates the todoList for that user
  const filter = { _id: userId };
  const update = { $push: { todoList: newTodoList } };
  User.findOneAndUpdate(filter, update)
    .then(() => res.json("User updated with todoList"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Gets userId and noteId from parameters and find the current user and deletes the note that wants to be deleted.
router.route("/delete/:userId/:noteId").delete((req, res) => {
  const userId = req.params.userId;
  const noteId = req.params.noteId;

  const filter = { _id: userId };
  const update = { $pull: { todoList: { _id: noteId } } };

  User.findOneAndUpdate(filter, update)
    .then(() => res.json("Note Deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
