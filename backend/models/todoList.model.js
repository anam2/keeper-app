const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todoListSchema = new Schema(
  {
    username: { type: String },
    password: { type: String },
    email: { type: String },
    title: { type: String },
    content: { type: String },
  },
  {
    timestamps: true,
  }
);

const TodoList = mongoose.model("TodoList", todoListSchema);

module.exports = TodoList;
