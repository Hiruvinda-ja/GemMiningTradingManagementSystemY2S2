const mongoose = require('mongoose');

const LandSchema = new mongoose.Schema({
    landName: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    areaSize: {
        type: Number,
        required: true
    },
    soilType: {
        type: String,
        required: true
    },
    gemTypes: {
        type: [String], // Updated to array of strings
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

const Land = mongoose.model('Land', LandSchema);

module.exports = Land;
