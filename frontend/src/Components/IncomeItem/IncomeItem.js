import React, { useState } from 'react'
import styled from 'styled-components'
import { dateFormat } from '../../utils/dateFormat';
import { Land,Machine,Investor,bitcoin, book, calender, card, circle, clothing, comment, dollar, food, freelance, medical, money, piggy, stocks, takeaway, trash, tv, users, yt, edit } from '../../utils/Icons';
import Button from '../Button/Button';
import { useGlobalContext } from "../../context/globalContext";

function IncomeItem({
    id,
    title,
    amount,
    date,
    category,
    description,
    deleteItem,
    updateItem,
    indicatorColor,
    type
}) {

    const categoryIcon = () =>{
        switch(category) {
            case 'Investor':
                return Investor;
            case 'Machine':
                return Machine;
            case 'HR':
                return users;
            case 'Land':
                return Land;
            case 'Other':
                return book;
            default:
                return ''
        }
    }

    const expenseCatIcon = () => {
        switch (category) {
            case 'Investor':
                return Investor;
            case 'Machine':
                return Machine;
            case 'HR':
                return users;
            case 'Land':
                return Land;
            case 'Other':
                return book;
            default:
                return ''
        }
    }

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [updatedIncome, setUpdatedIncome] = useState({
        title,
        amount,
        category,
        description,
        date,
    });

    const handleUpdateClick = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedIncome({ ...updatedIncome, [name]: value });
    };

    // const handleUpdateSubmit = () => {
    //     updateItem(id, updatedIncome);
    //     setIsPopupOpen(false);
    // };

    const { error, setError } = useGlobalContext(); // inside your component

    const handleUpdateSubmit = async () => {
        const result = await updateItem(id, updatedIncome);

        if (result?.success) {
            alert("✅ Income updated successfully!");
            setIsPopupOpen(false);
        } else {
            alert("❌ Failed to update income. Check the fields and try again.");
            setError("❌ Failed to update income. Check the fields and try again.");
            setTimeout(() => setError(null), 3000); // ⏱ clear after 3 seconds
        }
    };

    console.log('type', type)


    return (
        <IncomeItemStyled indicator={indicatorColor}>
            
            {/* Icon */}
            <div className="icon">
    {type === 'expense' ? expenseCatIcon() : categoryIcon()}
</div>

<div className="content">
    {/* Title */}
    <div className="row">
        <div className="column">
            <p><strong>Income Title : </strong> {title}</p>
        </div>
        <div className="column">
            <p><strong>Income Amount : </strong>LKR {amount}</p>
        </div>
        <div className="column">
            <div className="btn-group">
                <Button 
                    icon={edit}
                    bPad={'1rem'}
                    bRad={'50%'}
                    bg={'var(--primary-color)'}
                    color={'#fff'}
                    iColor={'#fff'}
                    hColor={'var(--color-green)'}
                    onClick={handleUpdateClick}
                />
                <Button 
                    icon={trash}
                    bPad={'1rem'}
                    bRad={'50%'}
                    bg="#990000"
                    color={'#fff'}
                    iColor={'#fff'}
                    hColor={'var(--color-green)'}
                    //onClick={() => deleteItem(id)}
                    onClick={async () => {
                        const res = await deleteItem(id);
                        if (res?.success) {
                          alert("✅ Expense deleted successfully!");
                        } else {
                          alert("❌ Failed to delete the expense.");
                        }
                      }
                    }
                />
            </div>
        </div>
    </div>

    {/* Transaction Date and Department */}
    <div className="row">
        <div className="column">
            <p><strong>Date : </strong> {dateFormat(date)}</p>
        </div>
        <div className="column">
            <p><strong>Department : </strong>{category}</p>
        </div>
        <div className="column">
            {/* Empty column for spacing */}
        </div>
    </div>

    {/* Description */}
    <p className="description">
        <strong>Description : </strong>
        {description}
    </p>
</div>

    
    

            {/* Update Popup */}
            {isPopupOpen && (
                <PopupStyled>
                <div className="popup-overlay" onClick={handleClosePopup}></div>
                <div className="popup">
                    <div className="popup-header">
                    <h3>{type === "expense" ? "Update Expense" : "Update Income"}</h3>
                    </div>

                    <div className="form-group">
                    <label htmlFor="title">Income Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={updatedIncome.title}
                        onChange={handleInputChange}
                        placeholder="Enter title"
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor="amount">Income Amount</label>
                    <div className="amount-input">
                        <span className="currency-symbol"></span>
                        <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={updatedIncome.amount}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        />
                    </div>
                    </div>

                    <div className="form-group">
                    <label htmlFor="category">Department</label>
                    <select
                        required
                        value={updatedIncome.category}
                        name="category"
                        id="category"
                        onChange={handleInputChange}
                    >
                        <option value="" disabled>
                        Department
                        </option>
                        {type === "expense" ? (
                        <>
                            <option value="Investor">Investor Department</option>
                            <option value="Machine">Machine Department</option>
                            <option value="Land">Land Department</option>
                            <option value="HR">HR Department</option> 
                            <option value="Other">Other</option>  
                        </>
                        ) : (
                        <>
                            <option value="Investor">Investor Department</option>
                            <option value="Machine">Machine Department</option>
                            <option value="Land">Land Department</option>
                            <option value="HR">HR Department</option> 
                            <option value="Other">Other</option>  
                        </>
                        )}
                    </select>
                    </div>

                    <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        value={updatedIncome.description}
                        onChange={handleInputChange}
                        placeholder="Add details about this transaction"
                        rows="3"
                    ></textarea>
                    </div>

                    <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={updatedIncome.date ? new Date(updatedIncome.date).toISOString().split("T")[0] : ""}
                        onChange={handleInputChange}
                    />
                    </div>

                    <div className="buttons">
                    <button className="update-btn" onClick={handleUpdateSubmit}>
                        Update
                    </button>
                    <button className="cancel-btn" onClick={handleClosePopup}>
                        Cancel
                    </button>
                    </div>
                </div>
                </PopupStyled>
      )}
      
        </IncomeItemStyled>
    )
}

const IncomeItemStyled = styled.div`
    //background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    color: #222260;

    .icon {
        width: 80px;
        height: 80px;
        border-radius: 20px;
        background: #FFFFFF;
        //background: #F5F5F5;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #FFFFFF;
    }

    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        h5 {
            font-size: 1.3rem;
            padding-left: 2rem;
            position: relative;
        }

        .row {
            display: flex;
            gap: 1rem;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;

            .column {
                flex: 1; /* Each column takes equal width */
                display: flex;
                
                align-items: center; /* Vertically center content */
            }

            p {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                color: var(--primary-color);
                opacity: 0.8;
                
            }
        }

            .btn-group {
                padding-left:50px;
                display: flex;
                gap: 1.5rem;
                justify-content: center; /* Center buttons horizontally */
            }
        }

        /* Ensures long descriptions wrap properly */
        .description {
            color: var(--primary-color);
            opacity: 0.8;
            max-width: 100%;
            overflow-wrap: break-word;
            word-wrap: break-word;
            white-space: normal;
            margin-top: 0.5rem;
        }
    }
`;

const PopupStyled = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    
    .popup-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
    }
    
    .popup {
        position: relative;
        background: white;
        padding: 0;
        border-radius: 16px;
        width: 450px;
        max-width: 90%;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        animation: slideIn 0.3s ease-out;
        overflow: hidden;
    }
    
    @keyframes slideIn {
        from {
            transform: translateY(20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .popup-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 24px;
        background: rgba(30, 21, 74, 0.97);
        color: white;
        border-top-left-radius: 16px;
        border-top-right-radius: 16px;
    }
    
    .popup-header h3 {
        margin: 0;
        font-size: 1.3rem;
        font-weight: 600;
        color: white;
        margin-left: 125px;
    }

    .form-group {
        margin: 16px 24px;
    }
    
    label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
        color: #333;
        font-size: 0.9rem;
    }
    
    input, select, textarea {
        width: 100%;
        padding: 12px 16px;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        font-size: 1rem;
        transition: border-color 0.2s, box-shadow 0.2s;
        background: #f9f9f9;
    }
    
    input:focus, select:focus, textarea:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(var(--primary-color-rgb), 0.1);
        background: white;
    }
    
    .amount-input {
        position: relative;
    }
    
    .currency-symbol {
        position: absolute;
        left: 16px;
        top: 50%;
        transform: translateY(-50%);
        color: #666;
    }
    
    input[name="amount"] {
        padding-left: 28px;
    }
    
    select {
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23666' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 16px center;
        padding-right: 40px;
    }
    
    textarea {
        resize: vertical;
        min-height: 80px;
    }
    
    .buttons {
        display: flex;
        justify-content: space-between;
        padding: 16px 24px 24px;
    }
    
    .buttons button {
        padding: 12px 0;
        border: none;
        cursor: pointer;
        border-radius: 8px;
        font-weight: 600;
        width: 48%;
        transition: all 0.2s;
    }
    
    .update-btn {
        background: rgba(30, 21, 74, 0.97);
        color: white;
    }
    
    .update-btn:hover {
        background: rgba(58, 40, 150, 0.97);
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(66, 173, 0, 0.2);
    }
    
    .cancel-btn {
        background: #990000;
        color: white;
    }
    
    .cancel-btn:hover {
        background:rgb(242, 56, 56);
        transform: translateY(-2px);
    }
    
    @media (max-width: 480px) {
        .popup {
            width: 100%;
            max-width: 100%;
            height: 100%;
            border-radius: 0;
            display: flex;
            flex-direction: column;
        }
        
        .popup-header {
            border-radius: 0;
        }
        
        .buttons {
            margin-top: auto;
        }
    }
`


export default IncomeItem