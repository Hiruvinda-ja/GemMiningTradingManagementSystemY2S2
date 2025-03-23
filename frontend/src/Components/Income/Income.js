import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';
import IncomeList from '../SearchBar/IncomeList'; // Import the IncomeList component

function Income() {
    const { addIncome, incomes, getIncomes, deleteIncome, totalIncome, updateIncome } = useGlobalContext();
    const [searchQuery, setSearchQuery] = useState(''); // State for search query

    useEffect(() => {
        getIncomes();
    }, []);

    // Filter incomes based on the search query
    const filteredIncomes = incomes.filter(income => {
        return (
            income.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            income.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            income.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    return (
        <IncomeStyled>
            <InnerLayout>
                <h1>Incomes</h1>
                <h2 className="total-income">Total Income: <span>LKR {totalIncome()}</span></h2>
                <div className="income-content">
                    <div className="form-container">
                        <Form />
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

                        {/* Render filtered incomes */}
                        {filteredIncomes.map((income) => {
                            const { _id, title, amount, date, category, description, type } = income;
                            return (
                                <IncomeItem
                                    key={_id}
                                    id={_id}
                                    title={title}
                                    description={description}
                                    amount={amount}
                                    date={date}
                                    type={type}
                                    category={category}
                                    indicatorColor="var(--color-green)"
                                    deleteItem={deleteIncome}
                                    updateItem={updateIncome}
                                />
                            );
                        })}
                    </div>
                </div>
            </InnerLayout>
        </IncomeStyled>
    );
}

const IncomeStyled = styled.div`
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

export default Income;