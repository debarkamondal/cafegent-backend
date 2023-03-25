const mongoose = require("mongoose");
const orders = require("./orders");
const { Schema } = mongoose;

const tableSchema = new Schema({
  table: {
    type: String,
    required: true,
    unique: true,
  },
  orders: [orders], // Uses orders schema as a subschema for this shchema/model
  phone: {
    type: Number,
    max: [9999999999, "The entered number is invalid"],
    min: [6000000000, "The entered number is invalid"],
  },
  availability: {
    type: Boolean,
    default: true, // Tracking availability of the tables true = available false = unavailable
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("tables", tableSchema);
