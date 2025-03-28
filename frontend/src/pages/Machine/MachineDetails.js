
import React, { useEffect, useState } from 'react';
import MachineSidebar from '../../Components/MachineSlidebar/MachineSidebar';
import { Link, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import axios from "axios";
import './MachineDetails.css';

function MachineDetails() {

  const [machines, setMachines] = useState([]);
  const navigate = useNavigate();

  

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await axios.get('http://localhost:2000/api/v1/get-machines');
        setMachines(response.data.reverse());  // Reverse the array to show new machines first
      } catch (error) {
        console.error(error);
        alert("Error fetching machines");
      }
    };
    fetchMachines();
  }, []);
  

 
  

  const deleteMachine = async (id) => {
    if (window.confirm("Are you sure you want to delete this Machine details?")) {
      try {
        await axios.delete(`http://localhost:2000/api/v1/delete-machine/${id}`);
        
        // Ensure the new list is reversed after deletion
        setMachines(prevMachines => [...prevMachines.filter(mac => mac._id !== id)].reverse());
        
      } catch (error) {
        console.error(error);
        alert("Failed to delete machine");
      }
    }
  };
  

  // Define columns with action buttons
  const columns = [
    
    { name: "S No", selector: (row, index) => index + 1 },
   

     
    {
      name: "Machine Images",
      selector: row => (
        row.machineImages && row.machineImages.length > 0 ? (
          <img 
            src={`http://localhost:2000${row.machineImages[0]}`}  //  Access first image in array
            alt="Machine" 
            width={100} 
            height={100} 
            style={{ objectFit: "cover" }} 
          />
        ) : "No Image"
      ),
    },




    { name: "Machine Name", selector: row => row.machineName  },
    //{ name: "Model Number", selector: row => row.modelNumber },
    { name: "Machine Category", selector: row => row.machineCategory },
    { name: "Supplier", selector: row => row.supplier?.name },
    { name: "Status", selector: row => row.status },
   // { name: "Price", selector: row => row.price },
   { name: "Price", selector: row => `${row.price} LKR`},  // Add "LKR" to the price 
  
    { name: "Quantity Available", selector: row => row.quantityAvailable },
    //{ name: "Machine Condition", selector: row => row.machineCondition },
   // { name: "Serial Number", selector: row => row.serialNumber },
    { name: "Location", selector: row => row.location },
   // { name: "Machine Description", selector: row => row.machineDescription },
   // { name: "Machine Images", selector: row => row.machineImages ? <img src={`http://localhost:2000/uploads/${row.machineImages}`} alt="Machine" width={100} height={100} /> : 'No Image' },
 
   /*{
    name: "Machine Images",
    selector: row => (
      row.machineImages ? (
        <img 
          src={`http://localhost:2000/uploads/${row.machineImages}`} 
          alt="Machine" 
         
          width={100} 
          height={100} 
          style={{ objectFit: "cover" }} // Optional: To make the image aspect ratio consistent
        />
      ) : "No Image"  // Fallback if no image exists
    ),
  },*/

  


    {
      name: "Action",
      cell: row => (
        <div>
          <button className='view-btn2' onClick={() => navigate(`/viewMachine/${row._id}`, { state: { machine: row } })}>View</button>
          <button className='edit-btn2' onClick={() => navigate(`/updateMachine/${row._id}`, { state: { machine: row } })}>Update</button>
          <button className='delete-btn2' onClick={() => deleteMachine(row._id)}>Delete</button>
          
         
        </div>
      )
    }
  ];

  return (
    <div className='machine-details-container'>

      
      <MachineSidebar />
     
       
    
      <div className='content3'>

        <h1 className='title'>Machine Details</h1> 
         
          <div className="top-controls">

             <div className="add-button">
              <Link to="/addMachine"><button>Add New Machine</button></Link>
             </div>

          </div>


       
        
        <DataTable
          columns={columns}
          data={machines}
         // pagination
          highlightOnHover
          responsive
          className='react-data-table'
         
        />
       
      </div>
      </div>
    
  );
}

export default MachineDetails;




