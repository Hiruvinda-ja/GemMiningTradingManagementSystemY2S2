const IncomeSchema = require("../models/IncomeModel");

exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    // Create a new income object
    const income = IncomeSchema({
        title,
        amount: Number(amount), // Convert to number
        category,
        description,
        date: new Date(date), // Convert to Date object
    });

    try {
        // Validations

        // 1. Check if all fields are filled
        if (!title || !amount || !category || !description || !date) {
            return res.status(400).json({ success: false, message: 'All fields are required!' });
        }

        // 2. Check if title contains only letters (no numbers or special characters)
        const titleRegex = /^[A-Za-z\s]+$/; // Allows letters and spaces
        if (!titleRegex.test(title)) {
            return res.status(400).json({ success: false, message: 'Title must contain only letters!' });
        }

        // 3. Check if amount is a positive number
        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({ success: false, message: 'Amount must be a positive number!' });
        }

        // 4. Check if the transaction date is today or in the past
        const currentDate = new Date();
        const inputDate = new Date(date);
        if (inputDate > currentDate) {
            return res.status(400).json({ success: false, message: 'Transaction date must be today or a past date!' });
        }

        // Save the income if all validations pass
        await income.save();
        res.status(200).json({ success: true, message: 'Income Added' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};


exports.getIncomes = async (req, res) =>{
    try {
        const incomes = await IncomeSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}


exports.deleteIncome = async (req, res) =>{
    const {id} = req.params;
    IncomeSchema.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message: 'Income Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}


exports.updateIncome = async (req, res) => {
    const { id } = req.params;
    const { title, amount, category, description, date } = req.body;

    try {
        // Validations

        // 1. Check if all fields are filled
        if (!title || !amount || !category || !description || !date) {
            return res.status(400).json({ success: false, message: 'All fields are required!' });
        }

        // 2. Check if title contains only letters (no numbers or special characters)
        const titleRegex = /^[A-Za-z\s]+$/; // Allows letters and spaces
        if (!titleRegex.test(title)) {
            return res.status(400).json({ success: false, message: 'Title must contain only letters!' });
        }

        // 3. Check if amount is a positive number
        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({ success: false, message: 'Amount must be a positive number!' });
        }

        // 4. Check if the transaction date is today or in the past
        const currentDate = new Date();
        const inputDate = new Date(date);

        // Ignore the time part by setting it to 00:00:00 for both dates
        currentDate.setHours(0, 0, 0, 0);
        inputDate.setHours(0, 0, 0, 0);

        if (inputDate > currentDate) {
            return res.status(400).json({ success: false, message: 'Transaction date must be today or a past date!' });
        }

        // Update the income if all validations pass
        const updatedIncome = await IncomeSchema.findByIdAndUpdate(
            id,
            { title, amount, category, description, date },
            { new: true }
        );

        if (!updatedIncome) {
            return res.status(404).json({ success: false, message: 'Income record not found' });
        }

        res.status(200).json({ success: true, message: 'Income Updated', updatedIncome });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};