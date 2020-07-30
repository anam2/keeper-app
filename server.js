const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

// Allow to get information from .env file
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const url = process.env.ATLAS_URL;
// Express.static --> charge of sending static files requests to the client
app.use(express.static(path.join(__dirname, "client", "build")));

mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// Checking to see if mongoose connection was successful
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Routes
const userRouter = require("./routes/user");

app.use("/user", userRouter);

// "Catchall" route hander.
app.all("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
