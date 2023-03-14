const express = require("express");
const table = require("../models/tables");
const bill = require("../models/bills");
const router = express.Router();
const getUser = require("../middleware/getUser");

//---------------------------------------------------------------------------Generating bill---------------------------------------------------------------------------//
/**
 * Generates bill and clears out table
 * @param table fetches and stores all the data about table
 * @param newBill stores the data to be pushed as a bill to the DB
 */

router.post("/generate", getUser, async (req, res) => {
  try {
    let table = await table.findById(req.body._id);
    if (!table) res.status(401).send("Order history not found");

    // creating new bill from table schema
    const newBill = await bill.create({
      ...table.toObject(),
      orders: [...table.orders],
    });

    //clearing out table
    table.availability = true;
    table.phone = 6666666666;
    table.orders = [];
    table.save();
    res.status(200).json(newBill);
  } catch (error) {
    console.log(error);
    res.status(500).send("some error occured");
  }
});

module.exports = router;
