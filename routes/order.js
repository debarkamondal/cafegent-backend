const express = require("express");
const table = require("../models/tables");
const router = express.Router();
const getUser = require("../middleware/getUser");

//------------------------------------------------------Creating an order---------------------------------------------------------//
/**
 * Create an order after verifying authToken
 * * Endpoint: "api/order/create"
 * @param getUser is responsible for decoding the data out of the JWT provided in the req obj
 */

router.put("/create", getUser, async (req, res) => {
  try {
    const newOrder = await table.findById(req.body._id);

    // Pushing all order items to the orders array and saving
    req.body.orders.forEach((item) => newOrder.orders.push(item));
    newOrder.save();
    res.status(200).json(newOrder.orders);
  } catch (error) {
    console.log(error);
    res.status(500).send("some error occured");
  }
});

module.exports = router;
