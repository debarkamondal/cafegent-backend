const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookTableSchema = new Schema({
  table: {
    type: Number,
    required: true,
  },
  phone: {
    type: Number,
    max: [9999999999, "The entered number is invalid"],
    min: [6000000000, "The entered number is invalid"],
    unique: true,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("bookTable", bookTableSchema);
