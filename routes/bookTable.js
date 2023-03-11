const express = require("express");
const bookTable = require("../models/tables");
const router = express.Router();
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/book", async (req, res) => {
  // Checking if the table is already booked or not
  try {
    let table = await bookTable.findOne({ table: req.body.table });
    if (!table.status) {
      console.log(req.body);
      console.log(table);
      return res.status(400).send("Table already booked");
    }

    // Booking table if the table is available
    const book = await bookTable.create({
      table: req.body.table,
      phone: req.body.phone,
      status: false,
    });

    // Creating and sending JWT.
    const data = {
      table: book.table,
      phone: book.phone,
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({ authToken });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occured");
  }
});

module.exports = router;
