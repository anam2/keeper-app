const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

// Allow to get information from .env file
require("dotenv").config();

const app = express();
// Runs application on host's port
const PORT = process.env.PORT || 5000;

app.use(cors());
// Used in order to get req.body values from client
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDb Atlas URL from .env file
const url = process.env.ATLAS_URL;

// Express.static --> charge of sending static files requests to the client
// path.join --> /_dirname/client/public/
// Allows us to serve images, CSS files. JS files in directory called public
app.use(express.static(path.join(__dirname, "client", "public")));

// Connecting to mongodb
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

// Checks to see if application is running on heroku or locally.
if (process.env.NODE_ENV === "production") {
  console.log("Running in production mode");
  app.use(express.static(path.join("client", "public")));
  // Going to serve up index.html when in heroku(production)
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/public/index.html"));
  });
} else {
  console.log("Running in development mode");
}

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
