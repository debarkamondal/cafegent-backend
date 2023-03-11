const mongoose = require("mongoose");
const { Schema } = mongoose;

const ordersSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bookTable",
  },
  orders: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "menuItems",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

module.exports = mongoose.model("orders", ordersSchema);
