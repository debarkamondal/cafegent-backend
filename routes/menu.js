const express = require("express");
const menuItems = require("../models/menuItems");
const router = express.Router();

/**
 * ! This API endpoint is only to be used by admin.
 * TODO: add JWT validation so that only admin can use the endpoint
 */

//---------------------------------------------------Creating a new menu item-----------------------------------------------------//
router.post("/addItem", async (req, res) => {
  try {
    const newMenuItem = await menuItems.create({
      name: req.body.name,
      price: req.body.price,
      tag: req.body.tag,
      genre: req.body.genre,
    });
    res.status(200).json(newMenuItem);
  } catch (error) {
    console.log(error);
    res.status(500).send("some error occured");
  }
});

router.delete("/deleteitem/:id", async (req, res) => {
  try {
    const menuItem = await menuItems.findByIdAndDelete(req.params.id);
    res.status(200).json(menuItem);
  } catch {
    console.log("Item not found");
  }
});

module.exports = router;
