import React, { useState } from 'react';
import styled from 'styled-components';

const SearchBar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        onSearch(query); // Pass the search query to the parent component
    };

    return (
        <SearchBarStyled>
            <input
                type="text"
                placeholder="Search by title, department or description..."
                value={searchQuery}
                onChange={handleInputChange}
            />
        </SearchBarStyled>
    );
};

const SearchBarStyled = styled.div`
    margin-bottom: 1rem;

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
`;

export default SearchBar;