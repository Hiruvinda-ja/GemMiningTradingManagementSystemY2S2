//*
/*import React, { useState, useEffect } from 'react';
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
    price: '',
    quantityAvailable: '',
    phone:'',
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


         
        <div>




          <div className="form-group">
            <label>Quantity</label>
            <input type="text" name="quantityAvailable" value={machine.quantityAvailable} placeholder='Enter Quantity' onChange={handleChange} required />
          </div>


          <div className="form-group">
              <label>Contact Number</label>
              <input type="text" name="phone" placeholder='Enter phone number' onChange={handleChange} required/>
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
*/


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
    phone: '',
    machineCondition: '',
    serialNumber: '',
    location: '',
    machineDescription: ''
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    if (location.state?.machine) {
      const { machineImages, supplier, ...machineData } = location.state.machine;
      setMachine(machineData);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setMachine({ ...machine, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(machine).forEach(([key, value]) => formData.append(key, value));
    if (image) {
      formData.append('machineImages', image);
    }

    try {
      await axios.put(`http://localhost:2000/api/v1/update-machine/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/machineDetails');
    } catch (error) {
      console.error("Error updating machine:", error);
      alert("Failed to update machine");
    }
  };

  return (
    <div className='update-machine-container'>
      <MachineSidebar />
      <div className="form-container">
        <h1>Update Details</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-section">
            <div>
              <div className="form-group">
                <label>Machine Name</label>
                <input type="text" name="machineName" value={machine.machineName} onChange={handleChange} required />
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
                <input type="text" name="modelNumber" value={machine.modelNumber} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input type="text" name="price" value={machine.price} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Quantity</label>
                <input type="text" name="quantityAvailable" value={machine.quantityAvailable} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Contact Number</label>
                <input type="text" name="phone" value={machine.phone} onChange={handleChange} required />
              </div>
            </div>




           {/*second section*/}

            <div>
             
              
             
              <div className="form-group">
                <label>Serial Number</label>
                <input type="text" name="serialNumber" value={machine.serialNumber} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input type="text" name="location" value={machine.location} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="machineDescription" value={machine.machineDescription} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Update Machine Image</label>
                <input type="file" onChange={handleImageChange} accept="image/*" />
              </div>
              {location.state?.machine?.machineImages?.[0] && (
                <div className="form-group">
                  <label>Current Image</label><br />
                  <img src={`http://localhost:2000${location.state.machine.machineImages[0]}`} alt="Current Machine" width="150" />
                </div>
              )}
            </div>
          </div>


          <div className='btn2'>
          <button type="button" className='go-back-btn' onClick={() => navigate('/MachineDetails')}>Back</button>
          <button type="submit" className='add-btn-machine'>Update Machine</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateMachine;
