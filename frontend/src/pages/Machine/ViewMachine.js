import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MachineSidebar from '../../Components/MachineSlidebar/MachineSidebar';
import './ViewMachine.css';

function ViewMachine() {
  const location = useLocation();
  const navigate = useNavigate();
  const machine = location.state?.machine;

  if (!machine) {
    return <div>Machine details not found</div>;
  }
  if (!machine.machineImages || !machine.machineImages[0]) {
    console.error('No image available for the machine');
  }

  return (
    <div>
      <MachineSidebar />
      <div className='content4'>
        <h1>Machine Details</h1>
        <img 
          src={`http://localhost:2000${machine.machineImages[0]}`} 
          //src={`http://localhost:2000${row.machineImages[0]}`}
          alt="Machine" 
          width={300} 
          height={300} 
          style={{ objectFit: "cover", borderRadius: "10px" }} 
        />
        <ul>
          <li><strong>Machine Name:</strong> {machine.machineName}</li>
          <li><strong>Model Number:</strong> {machine.modelNumber}</li>
          <li><strong>Category:</strong> {machine.machineCategory}</li>
          <li><strong>Supplier:</strong> {machine.supplier?.name || "N/A"}</li>
          <li><strong>Rent price per day:</strong> {machine.price}</li>
          <li><strong>Quantity Available:</strong> {machine.quantityAvailable}</li>
          <li><strong>Contact Number:</strong> {machine.phone}</li>
          <li><strong>Condition:</strong> {machine.machineCondition}</li>
          <li><strong>Serial Number:</strong> {machine.serialNumber}</li>
          <li><strong>Location:</strong> {machine.location}</li>
          <li><strong>Description:</strong> {machine.machineDescription}</li>
        </ul>
        <button onClick={() => navigate("/machineDetails")}>Back</button>
      </div>
    </div>
  );
}

export default ViewMachine;
