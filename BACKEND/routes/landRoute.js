const router = require("express").Router();
const Land = require("../models/Land");

// Add new land
router.route("/addLand").post(async (req, res) => {
    try {
        const { landName, latitude, longitude, areaSize, soilType, gemTypes, status } = req.body;

        if (!landName || !latitude || !longitude || !areaSize || !soilType || !gemTypes || !status) {
            return res.status(400).json({ error: "All fields are required" });
        }
    
        if (isNaN(latitude) || isNaN(longitude) || isNaN(areaSize)) {
            return res.status(400).json({ error: "Latitude, Longitude, and AreaSize must be numbers" });
        }

        const newLand = new Land({
            landName,
            latitude: Number(latitude),
            longitude: Number(longitude),
            areaSize: Number(areaSize),
            soilType,
            gemTypes,
            status
        });

        await newLand.save();
        res.status(201).json({ message: "Land Added Successfully", land: newLand });

    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
        res.status(500).json({ error: "Error adding land" });
    }
});

// Get all lands
router.route("/getLand").get(async (req, res) => {
    try {
        const lands = await Land.find();
        res.status(200).json(lands);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error fetching lands" });
    }
});

// Get a specific land by ID
router.route("/getLand/:id").get(async (req, res) => {
    try {
        const land = await Land.findById(req.params.id);
        if (!land) {
            return res.status(404).json({ error: "Land not found" });
        }
        res.status(200).json(land);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error fetching land" });
    }
});

// Update a land by ID
router.route("/updateLand/:id").put(async (req, res) => {
    try {
        const { landName, latitude, longitude, areaSize, soilType, gemTypes, status } = req.body;

        const updatedLand = await Land.findByIdAndUpdate(
            req.params.id,
            { landName, latitude, longitude, areaSize, soilType, gemTypes, status },
            { new: true } // Return the updated document
        );

        if (!updatedLand) {
            return res.status(404).json({ error: "Land not found" });
        }

        res.status(200).json({ message: "Land Updated Successfully", land: updatedLand });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error updating land" });
    }
});

// Delete a land by ID
router.route("/deleteLand/:id").delete(async (req, res) => {
    try {
        const deletedLand = await Land.findByIdAndDelete(req.params.id);
        if (!deletedLand) {
            return res.status(404).json({ error: "Land not found" });
        }
        res.status(200).json({ message: "Land Deleted Successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error deleting land" });
    }
});

module.exports = router;
