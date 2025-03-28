
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import MachineSidebar from '../../Components/MachineSlidebar/MachineSidebar';
import axios from 'axios';
import './UpdateMachine.css';

function UpdateMachine() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [machine, setMachine] = useState({
    machineName: '',
    machineCategory: '',
    modelNumber: '',
    status: '',
    price: '',
    quantityAvailable: '',
    machineCondition: '',
    serialNumber: '',
    location: '',
    machineDescription: ''
  });

  useEffect(() => {
    if (location.state && location.state.machine) {
      const { supplier, machineImages, ...machineData } = location.state.machine; // Exclude supplier and image
      setMachine(machineData);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setMachine({ ...machine, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:2000/api/v1/update-machine/${id}`, machine);
      navigate('/machineDetails');
    } catch (error) {
      console.error("Error updating machine:", error);
      alert("Failed to update machine");
    }
  };

  

  return (
   

    <div className='update-machine-container'  >
      
      
      <MachineSidebar />
     

    
      <div className="form-container">
        <h1>Update Details</h1>
        <form onSubmit={handleSubmit}>
          {/* Form Fields */}
          <div className="form-section">
            <div>

          <div className="form-group">
            <label>Machine Name</label>
            <input type="text" name="machineName" value={machine.machineName} placeholder='Enter machine name' onChange={handleChange} required />
          </div>


          <div className="form-group">
            <label>Machine Category</label>
            <select name="machineCategory" value={machine.machineCategory} onChange={handleChange} required>
              <option value="">Select Category</option>
              <option value="Excavator">Excavator</option>
              <option value="Drilling Machine">Drilling Machine</option>
              <option value="Crusher">Crusher</option>
              <option value="Shovel">Shovel</option>
              <option value="Other">Other</option>
            </select>
          </div>


          <div className="form-group">
            <label>Model Number</label>
            <input type="text" name="modelNumber" value={machine.modelNumber} placeholder='Enter Model number' onChange={handleChange} required />
          </div>



         


          <div className="form-group">
            <label>Rent or Sale</label>
            <select name="status" value={machine.status} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="Rent">Rent</option>
              <option value="Sale">Sale</option>
            </select>
          </div>

        
          <div className="form-group">
            <label>Price</label>
            <input type="text" name="price" value={machine.price} placeholder='Enter Price' onChange={handleChange} required />
          </div>

          </div>


         {/* Right Side of the Form */}
        <div>
          <div className="form-group">
            <label>Quantity</label>
            <input type="text" name="quantityAvailable" value={machine.quantityAvailable} placeholder='Enter Quantity' onChange={handleChange} required />
          </div>


          <div className="form-group">
            <label>Machine Condition</label>
            <select name="machineCondition" value={machine.machineCondition} onChange={handleChange} required>
              <option value="">Select Condition</option>
              <option value="New">New</option>
              <option value="Used">Used</option>
              <option value="Refurbished">Refurbished</option>
            </select>
          </div>


          <div className="form-group">
            <label>Serial Number</label>
            <input type="text" name="serialNumber" value={machine.serialNumber} placeholder='Enter serial number' onChange={handleChange} required />
          </div>


          <div className="form-group">
            <label>Location</label>
            <input type="text" name="location" value={machine.location} placeholder='Enter location' onChange={handleChange} required />
          </div>


          <div className="form-group">
            <label>Description</label>
            <textarea name="machineDescription" value={machine.machineDescription} placeholder="Enter Description" onChange={handleChange} required/>

          </div>
           

         


          
          </div>
          </div>
          

          <button type="submit">Update Machine</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateMachine;
