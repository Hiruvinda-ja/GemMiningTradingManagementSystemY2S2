import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import MachineSidebar from '../../Components/MachineSlidebar/MachineSidebar';
import axios from 'axios';
import './UpdateSupplier.css';

function UpdateSupplier() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState(location.state?.supplier || {});

  useEffect(() => {
    if (!supplier.name) {
      axios.get(`http://localhost:2000/api/v1/get-suppliers/${id}`)
        .then(response => setSupplier(response.data))
        .catch(error => console.error("Failed to fetch supplier", error));
    }
  }, [id, supplier.name]);

  const handleChange = (e) => {
    setSupplier({ ...supplier, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

// Validate Supplier Name
if (!supplier.name.trim()) {
  alert('Supplier name is required');
  return;
}

// Validate Phone Number (only digits, minimum length 10)
const phonePattern = /^[0-9]{10,}$/;
if (!supplier.phone || !phonePattern.test(supplier.phone)) {
  alert('Please enter a valid phone number with at least 10 digits');
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
      await axios.put(`http://localhost:2000/api/v1/update-supplier/${id}`, supplier);
      navigate("/supplierDetails");
    } catch (error) {
      console.error(error);
      alert("Failed to update supplier");
    }
  };

 

  return (
   
    <div className='update-supplier-container'>

      <div className='sidebar'>
      <MachineSidebar/>
      </div>

      <div className='formcontainer'>
      
          <form onSubmit={handleSubmit}>

          <h1>Update Supplier</h1>
            <div>
              <label>Supplier Name</label>
              <input type="text"
               name="name"
               value={supplier.name}
               placeholder='Enter supplier name'
               onChange={handleChange}
               required/>
            </div>

            <div>
              <label>Phone Number</label>
              <input 
              type="text"
              name="phone"
              value={supplier.phone}
              placeholder='Enter phone number'
              onChange={handleChange}
              required
              />
            </div>

            <div>
              <label>Email</label>
              <input type="Email"
              name="email" 
              value={supplier.email}
              placeholder='Enter email'
              onChange={handleChange}
              required
              />
            </div>

            <div>
              <label>Location</label>
              <input type="text" 
              name="location"
              value={supplier.location}
              placeholder='Enter address'
              onChange={handleChange}
              required
              />
            </div>

            <button className='update-supplier-btn' type="submit">Update Supplier</button>
          </form>
      </div>
      
      
    </div>
  )
}

export default UpdateSupplier;
