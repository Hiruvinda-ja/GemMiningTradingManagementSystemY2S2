import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';
import './Form.css';

function Form() {
    const { addIncome, getIncomes, error, setError } = useGlobalContext();

    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
    });

    const [successMessage, setSuccessMessage] = useState(null); // ✅ Added success message state

    const { title, amount, date, category, description } = inputState;

    const handleInput = name => e => {
        setInputState({ ...inputState, [name]: e.target.value });
        setError('');
        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await addIncome(inputState); // ✅ get the result
    
        if (result.success) {
            setInputState({
                title: '',
                amount: '',
                date: '',
                category: '',
                description: '',
            });
    
            setSuccessMessage("✅ Income added successfully!");
            setTimeout(() => setSuccessMessage(null), 3000);
        } else {
            // Show error for 3 seconds
            setTimeout(() => setError(null), 3000);
        }
    };
    
    

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            {successMessage && <p className='success'>{successMessage}</p>}
            {error && <p className='error'>{error}</p>}
            
            <div className="input-control">
                <label>Income Title</label>
                <input 
                    type="text" 
                    value={title}
                    name="title" 
                    placeholder="Income Title"
                    onChange={handleInput('title')}
                />
            </div>

            <div className="input-control">
                <label>Income Amount</label>
                <input 
                    value={amount}  
                    type="text" 
                    name="amount" 
                    placeholder="Income Amount"
                    onChange={handleInput('amount')} 
                />
            </div>

            <div className="input-control">
                <label>Transaction Date</label>
                <DatePicker 
                    id="date"
                    placeholderText="Transaction Date"
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                        setInputState({ ...inputState, date: date });
                    }}
                />
            </div>

            <div className="selects input-control">
                <label>Department</label>
                <select required value={category} name="category" id="category" onChange={handleInput('category')}>
                    <option value="" disabled>Department</option>
                    <option value="Investor">Investor Department</option>
                    <option value="Machine">Machine Department</option>
                    <option value="Land">Land Department</option>
                    <option value="HR">HR Department</option> 
                    <option value="Other">Other</option>  
                </select>
            </div>

            <div className="input-control">
                <label>Description</label>
                <textarea 
                    name="description" 
                    value={description} 
                    placeholder="Description" 
                    id="description" 
                    cols="30" 
                    rows="4" 
                    onChange={handleInput('description')}
                ></textarea>
            </div>

            <div className="submit-btn">
                <Button 
                    name="Add Income"
                    icon={plus}
                    bPad=".8rem 1.6rem"
                    bRad="30px"
                    bg={'var(--primary-color)'}
                    color="#fff"
                />
            </div>
        </form>
    );
}

export default Form;