const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bookTable",
  },
  orders: [],
});

module.exports = mongoose.model("bookTable", orderSchema);
