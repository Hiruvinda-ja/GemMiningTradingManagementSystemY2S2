const { addIncome, getIncomes, deleteIncome, updateIncome } = require('../controllers/income'); // Include updateIncome
const { addExpense, getExpense, deleteExpense, updateExpense } = require('../controllers/expense');

const router = require('express').Router();

router.post('/add-income', addIncome)
    .get('/get-incomes', getIncomes)
    .delete('/delete-income/:id', deleteIncome)
    .put('/update-income/:id', updateIncome) // Corrected the update route
    .put('/update-expense/:id', updateExpense)
    .post('/add-expense', addExpense)
    .get('/get-expenses', getExpense)
    .delete('/delete-expense/:id', deleteExpense);

module.exports = router;
