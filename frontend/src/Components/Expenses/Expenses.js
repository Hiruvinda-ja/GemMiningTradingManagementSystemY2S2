import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import ExpenseForm from './ExpenseForm';
import ExpenseItem from './ExpensesItem';

function Expenses() {
    const { addIncome, expenses, getExpenses, deleteExpense, totalExpenses, updateExpense } = useGlobalContext();
    const [searchQuery, setSearchQuery] = useState(''); // State for search query

    useEffect(() => {
        getExpenses();
    }, []);

    // Filter expenses based on the search query
    const filteredExpenses = expenses.filter(expense => {
        return (
            expense.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            expense.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            expense.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    return (
        <ExpenseStyled>
            <InnerLayout>
                <h1>Expenses</h1>
                <h2 className="total-income">Total Expense: <span>LKR {totalExpenses()}</span></h2>
                <div className="income-content">
                    <div className="form-container">
                        <ExpenseForm />
                    </div>
                    <div className="incomes">
                        {/* Add the SearchBar component */}
                        <div className="search-bar">
                            <input
                                type="text"
                                placeholder="Search by title, department, or description..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Render filtered expenses */}
                        {filteredExpenses.map((expense) => {
                            const { _id, title, amount, date, category, description, type } = expense;
                            return (
                                <ExpenseItem
                                    key={_id}
                                    id={_id}
                                    title={title}
                                    description={description}
                                    amount={amount}
                                    date={date}
                                    type={type}
                                    category={category}
                                    indicatorColor="var(--color-green)"
                                    deleteItem={deleteExpense}
                                    updateItem={updateExpense}
                                />
                            );
                        })}
                    </div>
                </div>
            </InnerLayout>
        </ExpenseStyled>
    );
}

const ExpenseStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-income {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px solid #ffffff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: 0.5rem;
        span {
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-green);
        }
    }
    .income-content {
        //display: flex;
        gap: 2rem;
        .incomes {
            flex: 1;
        }
    }
    .search-bar {
        margin-top: 3rem;
        margin-bottom: 1rem;
        margin-right: 780px;
        input {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            font-size: 1rem;
            transition: border-color 0.2s, box-shadow 0.2s;

            &:focus {
                outline: none;
                border-color: var(--primary-color);
                box-shadow: 0 0 0 3px rgba(var(--primary-color-rgb), 0.1);
            }
        }
    }
`;

export default Expenses;