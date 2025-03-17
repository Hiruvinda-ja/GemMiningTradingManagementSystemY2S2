const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    title: {  // Income Title
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    amount: {  // Income Amount
        type: Number,
        required: true,
        min: 0  // Ensures it's a positive number
    },
    date: {  // Transaction Date
        type: Date,
        required: true
    },
    department: {  // Department (Dropdown: Land Department, Machine Department, HR Department, Other)
        type: String,
        required: true,
        enum: ['Land Department','Machine Department','HR Department', 'Other']  // Restricts input to these values
    },
    paymentMethod: {  // Payment Method (Dropdown: Bank Transfer, Cash, Cheque, Online, Other)
        type: String,
        required: true,
        enum: ['Bank Transfer', 'Cash Payment', 'Cheque Payment', 'Online Payment', 'Other']
    },
    description: {  // Description
        type: String,
        required: true,
        maxLength: 100,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Expense', ExpenseSchema);
