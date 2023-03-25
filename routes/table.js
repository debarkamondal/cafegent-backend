const express = require("express");
const table = require("../models/tables");
const router = express.Router();
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

/**----------------------------------------------------------- Create a new table ---------------------------------------------------------------------/
 * *Endpoint: "/api/table/create"
 * ! Admin only API
 * TODO: create the specified number of tables from the req body.
 */

router.post("/create", async (req, res) => {
  try {
    const newTable = await table.create({
      table: req.body.table,
    });
    res.status(200).json(newTable);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occured");
  }
});

/**---------------------------------------------------------- Create a new table ----------------------------------------------------------------------/
 * * Endpoint: "/api/table/book"
 * * Public API
 * @param bookTable : fetches and stores the information about the table to be booked
 */

router.put("/book", async (req, res) => {
  try {
    let bookTable = await table.findOne({ table: req.body.table });

    // Checking if the table is already booked or not
    if (!bookTable.availability) {
      return res.status(200).send("Table already booked");
    }

    //* Updating table if it is available
    bookTable.table = req.body.table;
    bookTable.phone = req.body.phone;
    bookTable.availability = false;
    bookTable.save();

    // Creating and sending JWT.
    const data = {
      table: bookTable.table,
      phone: bookTable.phone,
      _id: bookTable._id,
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    res.status(200).json({ authToken });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occured");
  }
});

module.exports = router;
