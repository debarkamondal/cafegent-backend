/**
 * ! This API endpoint is only to be used by admin.
 * TODO: add JWT validation so that only admin can use the endpoint
 */

const express = require("express");
const menuItems = require("../models/menuItems");
const router = express.Router();

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

//-----------------------------------------------------Editing a menu item-------------------------------------------------------//

router.put("/edititem", async (req, res) => {
  try {
    const newMenuItem = await menuItems.findById(req.body._id);
    for (key in req.body) {
      if (key === "_id") continue;
      console.log(newMenuItem.key);
      req.body.key ? (newMenuItem.key = req.body.key) : null;
    }
    newMenuItem.save();
    res.status(200).json(newMenuItem);
  } catch (error) {
    res.status(500).json(error);
  }
});

//------------------------------------------------------Deleting menu item--------------------------------------------------------//
router.delete("/deleteitem/:id", async (req, res) => {
  try {
    const newMenuItem = await menuItems.findByIdAndDelete(req.params.id);
    res.status(200).json(newMenuItem);
  } catch {
    console.log("Item not found");
  }
});

module.exports = router;
