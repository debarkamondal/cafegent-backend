const express = require("express");
const table = require("../models/tables");
const bills = require("../models/bills");
const router = express.Router();
const getUser = require("../middleware/getUser");

router.post("/generate", getUser, async (req, res) => {
  try {
    let newBill = await table
      .findById(req.body._id)
      .select("-_id -availability");

    newBill = await bills.create(newBill);
    res.status(200).json(newBill);
  } catch (error) {
    console.log(error);
    res.status(500).send("some error occured");
  }
});

module.exports = router;
