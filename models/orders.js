const mongoose = require("mongoose");
const { Schema } = mongoose;

const ordersSchema = new Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "menuItems",
  },
  quantity: {
    type: Number,
    default: 1,
  },
  status: {
    type: String,
    Enum: ["Pending", "Accepted", "Preparing", "Ready", "Served"],
    default: "Pending",
  },
});

module.exports = ordersSchema;
