const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const investorSchema = new Schema({
    name:{
        type:String,//dataType
        required:true,//validate
    },
    funds:{
        type:Number,//dataType
        required:true,//validate
    },
    contact:{
        type:Number,//dataType
        required:true,//validate
    },
    address:{
        type:String,//dataType
        required:true,//validate
    },
    image:{
        type:String,//dataType
        required:true,//validate
    }
})

const investor = mongoose.model("Investor",investorSchema);

module.exports = investor;