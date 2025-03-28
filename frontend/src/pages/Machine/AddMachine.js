
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MachineSidebar from '../../Components/MachineSlidebar/MachineSidebar';
import axios from 'axios';
import './AddMachine.css';



function AddMachine() {
  const navigate = useNavigate();
  const [machine, setMachine] = useState({
    machineName: '',
    machineCategory: '',
    modelNumber: '',
    supplier: '',
    status: '',
    price: '',
    quantityAvailable: '',
    machineCondition: '',
    serialNumber: '',
    location: '',
    machineDescription: '',
    machineImages: null
  });
  const [Suppliers, setSuppliers] = useState([]);
  
  useEffect(() => {
     axios.get('http://localhost:2000/api/v1/get-suppliers')
      .then(response => setSuppliers(response.data))
      .catch(error => console.error("Error fetching suppliers", error));
  }, []);



  const handleChange = (e) => {
    setMachine({ ...machine, [e.target.name]: e.target.value });
  };



  const handleImageChange = (e) => {
    setMachine({ ...machine, machineImages: e.target.files[0] }); // Handle file change
  };



  //validations
  const validatePrice = () => {
    if (machine.price.trim() === '') {
      return 'Price is required.';
    }
    if (isNaN(machine.price) || parseFloat(machine.price) <= 0) {
      return 'Price must be a positive number.';
    }
    return '';
  };
  
  const validateQuantity = () => {
    if (machine.quantityAvailable.trim() === '') {
      return 'Quantity is required.';
    }
    if (isNaN(machine.quantityAvailable) || parseInt(machine.quantityAvailable) <= 0) {
      return 'Quantity must be a positive integer.';
    }
    return '';
  };




  const handleSubmit = async (e) => {
    e.preventDefault();

    const priceError = validatePrice();
    const quantityError = validateQuantity();
  
    if (priceError || quantityError) {
      alert(`${priceError}\n${quantityError}`);
      return;  // Prevent form submission if validation fails
    }
  
    // Proceed with form submission if validation passes

    const formData = new FormData();

    // Append all form fields and file
    for (const key in machine) {
      if (key === 'machineImages') {
        formData.append('machineImages', machine.machineImages); // Append the file
      } else {
        formData.append(key, machine[key]); // Append other fields
      }
    }

    try {
      // Make the POST request with FormData
      await axios.post('http://localhost:2000/api/v1/add-machine', formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      navigate("/machineDetails");  // Redirect to machine details after success
    } catch (error) {
      console.error("Error occurred while adding machine:", error.response);
      alert("Failed to add machine: " + error.response.data.message);
    }
  };

   


  return (
    <div className='add-machine-container'  >
      
      
      <MachineSidebar />
     

    
      <div className="form-container">
        <h1>Add Machine</h1>
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
            <label>Supplier Name</label>
            <select name="supplier" value={machine.supplier} onChange={handleChange} required>
              <option value="">Select supplier</option>
              {Suppliers.map(sup => (
                <option key={sup._id} value={sup._id}>{sup.name}</option>
              ))}
            </select>
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


          <div className="form-group">
            <label>Upload Image</label>
            <input type="file" name="machineImages" accept="image/*" onChange={handleImageChange} />
          </div>
          </div>
          </div>
          

          <button type="submit">Add Machine</button>
        </form>
      </div>
    </div>
  );
}

export default AddMachine;






