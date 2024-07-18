const db = require("../db/dbConfig");

// ALL COLORS
const getAllColors = async () => {
  try {
    const allColors = await db.any("SELECT * FROM colors");
    return allColors;
  } catch (error) {
    return error;
  }
};

const getColor = async (id) => {
  try {
    const oneColor = await db.one("SELECT * FROM colors WHERE id=$1", id);
    return oneColor;
  } catch (error) {
    return error;
  }
};

// CREATE COLOR
const createColor = async (color) => {
  try {
    const newColor = await db.one(
      "INSERT INTO colors (name, is_favorite) VALUES ($1, $2) RETURNING *",
      [color.name, color.is_favorite]
    );
    return newColor;
  } catch (error) {
    return error;
  }
};

module.exports = { getAllColors, getColor, createColor };
