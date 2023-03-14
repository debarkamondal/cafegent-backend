const express = require("express");
const table = require("../models/tables");
const router = express.Router();
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

/**--------------------------------------------------------------------------------------------------------------------------------/
 * Create a new table "/api/table/createtable"
 * ! Admin only API
 */

router.post("/create", async (req, res) => {
  // Booking table if the table is available
  try {
    const newTable = await table.create({
      tableNo: req.body.tableNo,
    });
    res.status(200).json(newTable);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occured");
  }
});

/**--------------------------------------------------------------------------------------------------------------------------------/
 * Create a new table "/api/table/booktable"
 * * Public API
 * @param bookTable : fetches and stores the information about the table to be booked
 */

router.put("/book", async (req, res) => {
  try {
    let bookTable = await table.findOne({ tableNo: req.body.tableNo });

    // Checking if the table is already booked or not
    if (!bookTable.availability) {
      return res.status(500).send("Table already booked");
    }

    //* Updating table if it is available
    bookTable.tableNo = req.body.tableNo;
    bookTable.phone = req.body.phone;
    bookTable.availability = false;
    bookTable.save();

    // Creating and sending JWT.
    const data = {
      tableNo: bookTable.tableNo,
      phone: bookTable.phone,
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({ authToken });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occured");
  }
});

module.exports = router;
