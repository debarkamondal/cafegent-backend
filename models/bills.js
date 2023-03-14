const mongoose = require("mongoose");
const orders = require("./orders");
const { Schema } = mongoose;

const billSchema = new Schema({
  tableNo: {
    type: String,
  },
  phone: {
    type: Number,
    max: [9999999999, "The entered number is invalid"],
    min: [6000000000, "The entered number is invalid"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  orders: [orders],
});

module.exports = mongoose.model("bills", billSchema);
