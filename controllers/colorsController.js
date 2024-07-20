// controllers/colorsController.js
const express = require("express"); // import the NPM package "express"
const colors = express.Router(); // Initialize a variable to create a route specific to colors
const {
  getAllColors,
  getColor,
  createColor,
  deleteColor,
  updateColor,
} = require("../queries/color"); // Importing the functions from the queries directory/color.js file
const { checkName, checkBoolean } = require("../validations/checkColors"); // Importing the functions from the validations directory/checkColors.js file

// INDEX
colors.get("/", async (req, res) => {
  const allColors = await getAllColors();
  if (allColors[0]) {
    res.status(200).json(allColors);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

// SHOW
colors.get("/:id", async (request, response) => {
  const { id } = request.params;
  const color = await getColor(id);
  if (color) {
    response.status(200).json(color);
  } else {
    response.status(404).json({ error: "not found" });
  }
});

// CREATE
colors.post("/", checkName, checkBoolean, async (request, response) => {
  const color = await createColor(request.body);
  response.json(color);
});

// DELETE
colors.delete("/:id", async (request, response) => {
  const { id } = request.params;
  const deletedColor = await deleteColor(id);
  if (deletedColor.id) {
    response.status(200).json(deletedColor);
  } else {
    response.status(404).json("Color not found");
  }
});

// UPDATE
colors.put("/:id", checkName, checkBoolean, async (request, response) => {
  const { id } = request.params;
  try {
    const updatedColor = await updateColor(id, request.body);
    response.status(200).json(updatedColor);
  } catch (error) {
    response.status(404).json({ error: `No colow with the id ${id} exists` });
  }
});

module.exports = colors;
