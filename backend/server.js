const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// Allow to get information from .env file
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const url = process.env.ATLAS_URL;

mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// Checking to see if mongoose connection was successful
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Routes
const todoListRouter = require("./routes/todoList");

app.use("/list", todoListRouter);

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
