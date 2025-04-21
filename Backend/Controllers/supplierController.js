//*
const supplierSchema = require("../Model/supplierModel")


exports.addSupplier=async(req,res)=>{
    const {name,phone,email,location}=req.body

    const supplierController=supplierSchema({
        name,
        phone,
        email,
        location
        
    })

    //do some validations using try catch
    try {
        await supplierController.save()
        res.status(200).json({message:'supplier added'})
    } catch (error) {
        res.status(400).json({message:'server error'})
    }
   console.log(supplierController)
}

//get all suppliers
exports.getSuppliers=async(req,res)=>{
    try {
        const suppliers=await supplierSchema.find()
        res.status(200).json(suppliers)
    } catch (error) {
        
        res.status(400).json({message:'server error'})
    }
}

//delete supplier
exports.deletesupplier=async(req,res)=>{
    const{id}=req.params;
    console.log(req.params);
    supplierSchema.findByIdAndDelete(id)
    .then((suppliers)=>{
        res.status(200).json({message:'supplier deleted'})

    })
    .catch((err)=>{
        res.status(400).json({message:'server error'})

    })

   
}

//update supplier
exports.updateSupplier = async (req, res) => {
    const { id } = req.params;
    const { name, phone, email, location } = req.body;

    try {
        const updatedSupplier = await supplierSchema.findByIdAndUpdate(
            id,
            { name, phone, email, location },
            { new: true, runValidators: true }
        );

        if (!updatedSupplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }

        res.status(200).json({ message: "Supplier updated successfully", updatedSupplier });
    } catch (error) {
        res.status(400).json({ message: "Server error", error: error.message });
    }
};





