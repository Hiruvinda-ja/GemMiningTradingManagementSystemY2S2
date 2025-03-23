import React, { useContext, useState } from "react"
import axios from 'axios'


const BASE_URL = "http://localhost:5500/api/v1/";


const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    //calculate incomes
    const [successMessage, setSuccessMessage] = useState(null);

    const addIncome = async (income) => {
        try {
            await axios.post(`${BASE_URL}add-income`, income);
            getIncomes();
            return { success: true }; // ✅ return success
        } catch (err) {
            setError(err.response.data.message);
            return { success: false }; // ❌ return failure
        }
    };
    

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`)
        setIncomes(response.data)
        console.log(response.data)
    }

    const deleteIncome = async (id) => {
        try {
          await axios.delete(`${BASE_URL}delete-income/${id}`);
          getIncomes();
          return { success: true, message: "✅ Income deleted successfully!" };
        } catch (err) {
          return { success: false, message: err.response?.data?.message || "❌ Failed to delete income." };
        }
      };

      const updateIncome = async (id, updatedIncome) => {
        try {
            const res = await axios.put(`${BASE_URL}update-income/${id}`, updatedIncome);
            getIncomes(); // Refresh list
            return { success: true, message: res.data.message };
        } catch (err) {
            const msg = err.response?.data?.message || "Failed to update income";
            setError(msg);
            return { success: false, message: msg };
        }
    };

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


    //calculate expenses
    const addExpense = async (expense) => {
        try {
            await axios.post(`${BASE_URL}add-expense`, expense);
            getExpenses();
            return { success: true };
        } catch (err) {
            setError(err.response.data.message);
            return { success: false };
        }
    };
    

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`)
        setExpenses(response.data)
        console.log(response.data)
    }

    const deleteExpense = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-expense/${id}`);
            getExpenses();
            return { success: true };
        } catch (err) {
            return { success: false };
        }
    };
    

    const updateExpense = async (id, updatedExpense) => {
        try {
            const res = await axios.put(`${BASE_URL}update-expense/${id}`, updatedExpense);
            getExpenses();
            return { success: true, message: res.data.message };
        } catch (err) {
            const msg = err.response?.data?.message || "Failed to update expense";
            setError(msg);
            return { success: false, message: msg };
        }
    };
    

    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3)
    }


    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            updateIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            updateExpense,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}