const mongoose = require("mongoose");
const { Schema } = mongoose;

const menuItemsSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  tag: {
    type: String,
    Enum: ["Veg", "Non-Veg"],
    required: true,
  },
  genre: {
    type: String,
    Enum: ["Starters", "Chinese", "Indian", "Beverages", "Breads", "Snacks"],
    required: true,
  },
});

module.exports = mongoose.model("menuItems", menuItemsSchema);
