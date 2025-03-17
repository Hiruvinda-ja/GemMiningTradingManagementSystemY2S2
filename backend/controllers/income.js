const IncomeSchema= require("../models/IncomeModel")

exports.addIncome = async(req, res) => {
    const {title, amount, date, department, paymentMethod, description}  = req.body

    const income = IncomeSchema({
        title,
        amount: Number(amount), // Convert to number
        date,
        department,
        paymentMethod,
        description, 
    })

    try {
        //validations
        if(!title || !amount || !date || !department || !paymentMethod || !description){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(isNaN(amount) || amount <= 0){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await income.save()
        res.status(200).json({message: 'Income Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    console.log(income)
}

exports.getIncomes = async (req, res) =>{
    try {
        const incomes = await IncomeSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

// exports.updateIncome = async (req, res) => {
//     const { id } = req.params;
//     const {title, amount, date, department, paymentMethod, description} = req.body;

//     try {
//         // Validations
//         if (!title || !amount || !date || !department || !paymentMethod || !description) {
//             return res.status(400).json({ message: 'All fields are required!' });
//         }
//         if (isNaN(amount) || amount <= 0) {
//             return res.status(400).json({ message: 'Amount must be a positive number!' });
//         }

//         const updatedIncome = await IncomeSchema.findByIdAndUpdate(
//             id,
//             { title, amount, date, department, paymentMethod, description },
//             { new: true }
//         );

//         if (!updatedIncome) {
//             return res.status(404).json({ message: 'Income record not found' });
//         }

//         res.status(200).json({ message: 'Income Updated', updatedIncome });
//     } catch (error) {
//         res.status(500).json({ message: 'Server Error', error });
//     }
// }

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