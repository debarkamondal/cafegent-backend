const mongoose = require("mongoose");
const { Schema } = mongoose;

const ordersSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tables",
  },
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
    Enum: ["Accepted", "Preparing", "Ready", "Served"],
  },
});

module.exports = mongoose.model("orders", ordersSchema);
