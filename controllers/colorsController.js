// controllers/colorsController.js
const express = require("express");
const colors = express.Router();
const { getAllColors, getColor, createColor } = require("../queries/color");
const { checkName, checkBoolean } = require("../validations/checkColors");

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

module.exports = colors;
