const express = require("express");
const Investor = require("../Model/investorModel");
const router = express.Router();

// Get all investors
router.get("/display", async (req, res) => {
  try {
    const investors = await Investor.find();
    res.json(investors);
  } catch (err) {
    res.status(500).json({ message: "Error fetching investors", error: err });
  }
});

// Add new investor
router.post("/add", async (req, res) => {
  try {
    const { name, funds, contact, address, image } = req.body;
    const newInvestor = new Investor({ name, funds, contact, address, image });
    await newInvestor.save();
    res.status(201).json(newInvestor); // Send the newly added investor
  } catch (err) {
    res.status(500).json({ message: "Error adding investor", error: err });
  }
});

// Update investor
router.put("/update/:id", async (req, res) => {
  try {
    const updatedInvestor = await Investor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedInvestor);
  } catch (err) {
    res.status(500).json({ message: "Error updating investor", error: err });
  }
});

// Delete investor
router.delete("/delete/:id", async (req, res) => {
  try {
    await Investor.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Investor deleted!" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting investor", error: err });
  }
});

module.exports = router;
