const mongoose=require('mongoose');


const machineSchema=new mongoose.Schema({
    machineName: {
        type: String,
        required: true,
        trim: true,
        maxLength:100,
    },
    
    machineCategory: {
        type: String,
        enum: ['Excavator', 'Drilling Machine', 'Crusher', 'Shovel', 'Other'], // List categories here
        required: true
    },
    
    
    modelNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'supplierModel', // Reference to the Supplier model
        required: true
    },
    
    
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be a positive number']
    },
    quantityAvailable: {
        type: Number,
        required: true,
        min: [0, 'Quantity must be a positive number']
    },
    phone:{
        type:String,
        required:true,
        trim:true,
        maxLength:10

    },


    machineCondition: {
        type: String,
        enum: ['New', 'Refurbished', 'Used'],
        required: true
    },
   
    serialNumber: {
        type: String,
        required: true,
        unique: true
    },
    
    location: {
        type: String,
        required: true
    },
    machineDescription: {
        type: String,
        required: true,
        trim: true
    },
    
    machineImages: [{
        type: String, // URL or path to the image
    }],
    
   
})

module.exports=mongoose.model('machineModel',machineSchema)
