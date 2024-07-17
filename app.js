// app.js
// DEPENDENCIES
const cors = require("cors");
const express = require("express");
const colorsController = require("./controllers/colorsController");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to Colors App");
});

app.use("/colors", colorsController);

//404 PAGE
app.get("*", (request, response) => {
  response.status(404).send("Page not found");
});

// EXPORT
module.exports = app;
