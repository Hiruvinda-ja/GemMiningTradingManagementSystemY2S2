import React, { useState } from 'react';
import styled from 'styled-components';
import IncomeItem from '../IncomeItem/IncomeItem';
import SearchBar from './SearchBar';

const IncomeList = ({ incomes, deleteIncome, updateIncome }) => {
    const [searchQuery, setSearchQuery] = useState('');

    // Filter incomes based on the search query
    const filteredIncomes = incomes.filter(income => {
        return (
            income.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            income.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            income.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    return (
        <IncomeListStyled>
            {/* Add the SearchBar component */}
            <SearchBar onSearch={setSearchQuery} />

            {/* Render filtered incomes */}
            {filteredIncomes.map(income => (
                <IncomeItem
                    key={income._id}
                    id={income._id}
                    title={income.title}
                    amount={income.amount}
                    date={income.date}
                    category={income.category}
                    description={income.description}
                    deleteItem={deleteIncome}
                    updateItem={updateIncome}
                    indicatorColor="var(--color-green)"
                    type={income.type}
                />
            ))}
        </IncomeListStyled>
    );
};

const IncomeListStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export default IncomeList;