//*
/*import React, { useEffect, useState } from 'react';
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
    { name: "Phone", selector: row => row.phone },
   // { name: "Price", selector: row => row.price },
   { name: "Price", selector: row => `${row.price} LKR`},  // Add "LKR" to the price 
  
    { name: "Quantity Available", selector: row => row.quantityAvailable },
    //{ name: "Machine Condition", selector: row => row.machineCondition },
   // { name: "Serial Number", selector: row => row.serialNumber },
    { name: "Location", selector: row => row.location },
   // { name: "Machine Description", selector: row => row.machineDescription },
   // { name: "Machine Images", selector: row => row.machineImages ? <img src={`http://localhost:2000/uploads/${row.machineImages}`} alt="Machine" width={100} height={100} /> : 'No Image' },
 


  


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
*/


import jsPDF from 'jspdf';
import 'jspdf-autotable';
import React, { useEffect, useState } from 'react';
import MachineSidebar from '../../Components/MachineSlidebar/MachineSidebar';
import { Link, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import axios from "axios";
import './MachineDetails.css';

function MachineDetails() {
  const [machines, setMachines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await axios.get('http://localhost:2000/api/v1/get-machines');
        setMachines(response.data.reverse());
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
        setMachines(prevMachines => [...prevMachines.filter(mac => mac._id !== id)].reverse());
      } catch (error) {
        console.error(error);
        alert("Failed to delete machine");
      }
    }
  };

  const columns = [
    { name: "S No", selector: (row, index) => index + 1 },
    {
      name: "Machine Images",
      selector: row => (
        row.machineImages && row.machineImages.length > 0 ? (
          <img
            src={`http://localhost:2000${row.machineImages[0]}`}
            alt="Machine"
            width={100}
            height={100}
            style={{ objectFit: "cover" }}
          />
        ) : "No Image"
      ),
    },
    { name: "Machine Name", selector: row => row.machineName },
    { name: "Machine Category", selector: row => row.machineCategory },
    { name: "Supplier", selector: row => row.supplier?.name },
    { name: "Contact Number", selector: row => row.phone },
    { name: "Rent price per day", selector: row => `${row.price} LKR` },
    { name: "Quantity Available", selector: row => row.quantityAvailable },
    { name: "Location", selector: row => row.location },
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

  const filteredMachines = machines.filter(machine => {
    const category = machine.machineCategory?.toLowerCase() || '';
    const supplier = machine.supplier?.name?.toLowerCase() || '';
    return category.includes(searchTerm.toLowerCase()) || supplier.includes(searchTerm.toLowerCase());
  });

  const downloadPDF = async () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setTextColor(40);
    
    const title = "Machine Report";
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(title);
    const x = (pageWidth - textWidth) / 2;
    
    doc.text(title, x, 22);  // Centered title
    
    const tableColumn = ["S No", "Image", "Machine Name", "Category", "Supplier", "Contact", "Rent Price", "Qty", "Location"];
    const tableRows = [];

    const toDataURL = (url) =>
      fetch(url)
        .then(response => response.blob())
        .then(blob => new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        }));

    const imageDataMap = {};

    for (const [index, machine] of filteredMachines.entries()) {
      let imgData = '';
      if (machine.machineImages?.[0]) {
        const imageUrl = `http://localhost:2000${machine.machineImages[0]}`;
        try {
          imgData = await toDataURL(imageUrl);
          imageDataMap[index] = imgData;
        } catch (err) {
          console.warn("Image load failed", imageUrl);
        }
      }

      const rowData = [
        index + 1,
        '', // Image will be inserted manually
        machine.machineName,
        machine.machineCategory,
        machine.supplier?.name,
        machine.phone,
        `${machine.price} LKR`,
        machine.quantityAvailable,
        machine.location
      ];
      tableRows.push(rowData);
    }

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      theme: 'striped',
      styles: {
        fontSize: 10,
        cellPadding: 4,
        textColor: [44, 44, 44],
        halign: 'left',
      },
      headStyles: {
        fillColor: [30, 21, 74],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        halign: 'center',
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      margin: { top: 30 },
      columnStyles: {
        0: { cellWidth: 13 },  // S No
        1: { cellWidth: 20 },  // Image
        2: { cellWidth: 25 },  // Machine Name
        3: { cellWidth: 23 },  // Category
        4: { cellWidth: 22 },  // Supplier
        5: { cellWidth: 28 },  // Contact Number
        6: { cellWidth: 22 },  // Rent Price
        7: { cellWidth: 15 },  // Quantity
        8: { cellWidth: 23 },  // Location
      },
      didDrawCell: (data) => {
        if (data.section === 'body' && data.column.index === 1 && imageDataMap[data.row.index]) {
          doc.addImage(
            imageDataMap[data.row.index],
            'JPEG',
            data.cell.x + 2,
            data.cell.y + 2,
            15,
            15
          );
        }
      }
    });

    doc.save('Machine_Report.pdf');
  };

  return (
    <div className='machine-details-container'>
      <MachineSidebar />
      <div className='content3'>
        <h1 className='title'>Machine Details</h1>

        <div className="top-controls">
          <div className="search-bar-container">
            <input
              type="text"
              placeholder="Search by Category or Supplier"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="right-buttons">
            <div className="download-button">
              <button className="download-btn" onClick={downloadPDF}>Download Report</button>
            </div>
            <div className="add-button">
              <Link to="/addMachine"><button>Add New Machine</button></Link>
            </div>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredMachines}
          highlightOnHover
          responsive
          className='react-data-table'
        />
      </div>
    </div>
  );
}

export default MachineDetails;
