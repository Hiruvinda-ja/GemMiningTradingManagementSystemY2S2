const {addIncome, getIncomes, deleteIncome} = require('../controllers/income')
const { addExpense, getExpense, deleteExpense} = require('../controllers/expense');

const router = require('express').Router();


router.post('/add-income', addIncome)
    .get('/get-incomes', getIncomes)
    //.put('/update-income/:id', updateIncome)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense', addExpense)
    //.put('/update-expense/:id', updateExpense)
    .get('/get-expenses', getExpense)
    .delete('/delete-expense/:id', deleteExpense);
    

module.exports = router