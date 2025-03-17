const ExpenseSchema = require("../models/ExpenseModel")


exports.addExpense = async (req, res) => {
    const {title, amount, date, department, paymentMethod, description} = req.body;

    const expense = new ExpenseSchema({
        title,
        amount: Number(amount), // Convert to number
        date,
        department,
        paymentMethod,
        description, 
    });

    try {
        // Validations
        if (!title || !amount || !date || !department || !paymentMethod || !description) {
            return res.status(400).json({ message: 'All fields are required!' });
        }
        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({ message: 'Amount must be a positive number!' });
        }

        await expense.save();
        res.status(200).json({ message: 'Expense Added', expense });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }

    console.log(expense);
};


exports.getExpense = async (req, res) =>{
    try {
        const incomes = await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.updateExpense = async (req, res) => {
    const { id } = req.params;
    const { title, amount, date, department, paymentMethod, description } = req.body;

    try {
        // Validations
        if (!title || !amount || !date || !department || !paymentMethod || !description) {
            return res.status(400).json({ message: 'All fields are required!' });
        }
        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({ message: 'Amount must be a positive number!' });
        }

        const updatedIncome = await ExpenseSchema.findByIdAndUpdate(
            id,
            { title, amount, date, department, paymentMethod, description },
            { new: true }
        );

        if (!updatedIncome) {
            return res.status(404).json({ message: 'Expense record not found' });
        }

        res.status(200).json({ message: 'Expense Updated', updatedIncome });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

exports.deleteExpense = async (req, res) =>{
    const {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message: 'Expense Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}