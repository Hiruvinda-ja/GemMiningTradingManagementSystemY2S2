//*
/*const machineSchema = require("../Model/machineModel")
const machineRoute = require("../Route/machineRoute");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });



exports.addMachine=async(req,res)=>{
    const { machineCategory,machineName,modelNumber,supplier,price,quantityAvailable,phone,machineCondition,serialNumber,location,machineDescription}=req.body
   // const machineImages = req.file ? req.file.path :null; // Store image path
   const machineImages = req.file ? `/uploads/${req.file.filename}` : null;


    const newMachine= new machineSchema({

        machineName,
        machineCategory,
        modelNumber,
        supplier,
        price,
        quantityAvailable,
        phone,
        machineCondition,
        serialNumber,
        location,
        machineDescription,
        machineImages:[machineImages]

        
    })

    //do some validations using try catch
    try {
        await newMachine.save()
        res.status(200).json({message:'machine added'})
    } catch (error) {
        res.status(400).json({message:'server error',error:error.message});
    }
   console.log(newMachine)
}

//get all suppliers
exports.getMachines=async(req,res)=>{
    try {
        const machines=await machineSchema.find().populate('supplier','name');
        res.status(200).json(machines)
    } catch (error) {
        
        res.status(400).json({message:'server error'})
    }
}

//delete supplier
exports.deletemachine=async(req,res)=>{
    const{id}=req.params;
    console.log(req.params);
    machineSchema.findByIdAndDelete(id)
    .then((machines)=>{
        res.status(200).json({message:'machine deleted'})

    })
    .catch((err)=>{
        res.status(400).json({message:'server error'})

    })

   
}

exports.updateMachine = async (req, res) => {
    const { id } = req.params;
    const { machineName, machineCategory, modelNumber, price, quantityAvailable,phone, machineCondition, serialNumber, location, machineDescription } = req.body;

    console.log("Request Body:", req.body); // Log the request body

    try {
        const updatedMachine = await machineSchema.findByIdAndUpdate(
            id,
            { machineName, machineCategory, modelNumber, price, quantityAvailable,phone, machineCondition, serialNumber, location, machineDescription },
            { new: true, runValidators: true }
        );

        if (!updatedMachine) {
            return res.status(404).json({ message: "Machine not found" });
        }

        console.log("Updated Machine:", updatedMachine); // Log the updated machine

        res.status(200).json({ message: "Machine updated successfully", updatedMachine });
    } catch (error) {
        console.error("Update Error:", error); // Log the error
        res.status(400).json({ message: "Server error", error: error.message });
    }
};
*/


const machineSchema = require("../Model/machineModel")
const machineRoute = require("../Route/machineRoute");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });



// Add Machine
exports.addMachine = async (req, res) => {
  const {
    machineCategory, machineName, modelNumber, supplier, price,
    quantityAvailable, phone, machineCondition, serialNumber, location, machineDescription
  } = req.body;

  const machineImages = req.file ? `/uploads/${req.file.filename}` : null;

  const newMachine = new machineSchema({
    machineName,
    machineCategory,
    modelNumber,
    supplier,
    price,
    quantityAvailable,
    phone,
    machineCondition,
    serialNumber,
    location,
    machineDescription,
    machineImages: [machineImages]
  });

  try {
    await newMachine.save();
    res.status(200).json({ message: 'Machine added' });
  } catch (error) {
    res.status(400).json({ message: 'Server error', error: error.message });
  }
};

// Get All Machines
exports.getMachines = async (req, res) => {
  try {
    const machines = await machineSchema.find().populate('supplier', 'name');
    res.status(200).json(machines);
  } catch (error) {
    res.status(400).json({ message: 'Server error' });
  }
};

// Delete Machine
exports.deletemachine = async (req, res) => {
  const { id } = req.params;
  try {
    await machineSchema.findByIdAndDelete(id);
    res.status(200).json({ message: 'Machine deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Server error' });
  }
};

// Update Machine + Image
exports.updateMachine = async (req, res) => {
  const { id } = req.params;
  const {
    machineName, machineCategory, modelNumber, price,
    quantityAvailable, phone, machineCondition, serialNumber,
    location, machineDescription
  } = req.body;

  const updatedData = {
    machineName,
    machineCategory,
    modelNumber,
    price,
    quantityAvailable,
    phone,
    machineCondition,
    serialNumber,
    location,
    machineDescription
  };

  if (req.file) {
    updatedData.machineImages = [`/uploads/${req.file.filename}`];
  }

  try {
    const updatedMachine = await machineSchema.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true
    });

    if (!updatedMachine) {
      return res.status(404).json({ message: "Machine not found" });
    }

    res.status(200).json({ message: "Machine updated successfully", updatedMachine });
  } catch (error) {
    res.status(400).json({ message: "Server error", error: error.message });
  }
};
