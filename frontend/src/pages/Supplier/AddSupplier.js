import React, { useState } from 'react'
import MachineSidebar from '../../Components/MachineSlidebar/MachineSidebar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddSupplier.css';

function AddSupplier() {

  const [supplier,setSupplier]=useState({
    
     name:'',
     phone:'',
     email:'',
     location:'',
  })
  const navigate=useNavigate()

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setSupplier({...supplier,[name]:value})
  }

  /*const handleSubmit= async(e)=>{
    e.preventDefault()
    try {
      const response=await axios.post('http://Localhost:2000/api/v1/add-supplier',supplier);

      
      if(response.data.success){
         navigate("/supplierDetails");
      }
       


    } catch (error) {
      if(error.response && !error.response.data.success){
        alert(error.response.data.error)
      }
    }
  }*/
    const handleSubmit = async (e) => {
      e.preventDefault();


    // Validate Supplier Name
  if (!supplier.name.trim()) {
    alert('Supplier name is required');
    return;
  }

  // Validate Phone Number (only digits, minimum length 10)
  const phonePattern = /^[0-9]{10}$/;
  if (!supplier.phone || !phonePattern.test(supplier.phone)) {
    alert('Please enter a valid phone number with  10 digits');
    return;
  }

  // Validate Email format
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!supplier.email || !emailPattern.test(supplier.email)) {
    alert('Please enter a valid email address');
    return;
  }

  // Validate Location (non-empty)
  if (!supplier.location.trim()) {
    alert('Location is required');
    return;
  }

  // If all validations pass, proceed with the form submission


      try {
        const response = await axios.post('http://localhost:2000/api/v1/add-supplier', supplier);
        
        if (response.status === 200) {
          navigate("/supplierDetails");
        }
      } catch (error) {
        console.error(error);
        alert("Failed to add supplier");
      }



    };
    


  return (
   
    <div className='add-supplier-container' >


      
      <MachineSidebar/>
      

      <div className='formcontainer' >
       
      
          <form onSubmit={handleSubmit}>
            
          <h1>Add Supplier</h1>
             <div>
              <label>Supplier Name</label>
              <input type="text"
               name="name"
               placeholder='Enter supplier name'
               onChange={handleChange}
               required/>
             </div>

             <div>
              <label>Phone Number</label>
              <input 
              type="text"
              name="phone"
              placeholder='Enter phone number'
              onChange={handleChange}
              required
              />
            </div>

            <div>
              <label>Email</label>
              <input type="Email"
              name="email" 
              placeholder='Enter email'
              onChange={handleChange}
              required
              />
            </div>

            <div>
              <label>Location</label>
              <input type="text" 
              name="location"
              placeholder='Enter address'
              onChange={handleChange}
              required
              />
            </div>

            <button className='add-supplier-btn' type="submit">Add Supplier</button>
            
          </form>
          </div>
      </div>
     
      
      
    
  )
}

export default AddSupplier