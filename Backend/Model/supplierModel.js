const mongoose=require('mongoose');


const supplierSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        maxLength:50

    },
    phone:{
        type:String,
        required:true,
        trim:true,
        maxLength:10

    },
    email:{
        type:String,
        required:true,
        trim:true,
        maxLength:50

    },
    location:{
        type:String,
        required:true,
        trim:true,
        maxLength:50

    },
})

module.exports=mongoose.model('supplierModel',supplierSchema)
