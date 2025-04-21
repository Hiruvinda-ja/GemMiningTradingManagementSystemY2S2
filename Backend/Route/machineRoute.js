
const express = require("express");
const { addMachine, getMachines, deletemachine, updateMachine } = require("../Controllers/machineController");
const multer = require("multer");
const path = require("path");

const router = express.Router();

//  Set Up Storage for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Images will be stored in "uploads/" directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); //  Rename file
    },
});

const upload = multer({ storage: storage });

//  Modify This Endpoint to Handle Image Uploads
router.post("/add-machine", upload.single("machineImages"), addMachine);
router.get("/get-machines", getMachines);
router.delete("/delete-machine/:id", deletemachine);
//router.put("/update-machine/:id", updateMachine);
router.put("/update-machine/:id", upload.single("machineImages"), updateMachine);



module.exports = router;
