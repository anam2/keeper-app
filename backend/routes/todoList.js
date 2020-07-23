const bodyParser = require("body-parser");
const router = require("express").Router();
let TodoList = require("../models/todoList.model");

// ?
router.route("/").get((req, res) => {
  TodoList.find()
    .then((todoLists) => res.json(todoLists))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  console.log(req.body);
  const title = req.body.title;
  const content = req.body.content;

  const newTodoList = new TodoList({
    title,
    content,
  });

  newTodoList
    .save()
    .then(() => res.json("todoList added to DB!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  console.log(req.params);
  TodoList.findById(req.params.id)
    .then((list) => res.json(list))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  TodoList.findByIdAndDelete(req.params.id)
    .then(() => res.json("TodoList deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
