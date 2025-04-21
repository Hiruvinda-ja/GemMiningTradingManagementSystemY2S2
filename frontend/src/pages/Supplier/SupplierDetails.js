//*
/*import React, { useEffect, useState } from 'react';
import MachineSidebar from '../../Components/MachineSlidebar/MachineSidebar';
import { Link, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import axios from "axios";
import './SupplierDetails.css';


function SupplierDetails() {
  const [suppliers, setSuppliers] = useState([]);
//filter suppliers
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('http://localhost:2000/api/v1/get-suppliers');
        setSuppliers(response.data.reverse());
      } catch (error) {
        console.error(error);
        alert("Error fetching suppliers");
      }
    };
    fetchSuppliers();
  }, []);

  // Delete Supplier Function
  const deleteSupplier = async (id) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      try {
        await axios.delete(`http://localhost:2000/api/v1/delete-supplier/${id}`);
        setSuppliers(suppliers.filter(sup => sup._id !== id));
      } catch (error) {
        console.error(error);
        alert("Failed to delete supplier");
      }
    }
  };




  //  Filter suppliers based on search input
  const filteredSuppliers = suppliers.filter(sup =>
    sup.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Define columns with action buttons
  const columns = [
    { name: "S No", selector: (row, index) => index + 1 },
    { name: "Name", selector: row => row.name },
    { name: "phone", selector: row => row.phone },
    { name: "Email", selector: row => row.email },
    { name: "Location", selector: row => row.location },
    {
      name: "Action",
      cell: row => (
        <div>
          <button className='edit-btn' onClick={() => navigate(`/updateSupplier/${row._id}`, { state: { supplier: row } })}>Update  </button>
          
          <button className='delete-btn'  onClick={() => deleteSupplier(row._id)}>Delete</button>
        </div>
      )
    }
  ];


  
  

  return (
  <div className='supplier-details-container'>

     
      <MachineSidebar />
     


  <div className='content'>
          
       
     <h1 className="title">Supplier Details</h1>
       
    <div className="top-controls">
      <div className="add-button">
              <Link to="/addSupplier"><button>Add New Supplier</button></Link>
              <button className="download-btn" >Download Report</button>
      </div>
      <div className="search-bar">
      <input
          type="text"
          placeholder="Search by Supplier Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        /> 
      </div>
 

    </div>
      

      <div className='react-data-table'>

      <DataTable columns={columns} data={filteredSuppliers} />
       </div>
  </div>
   </div>
    
  );
}

export default SupplierDetails;
*/









import jsPDF from 'jspdf';
import 'jspdf-autotable';
import React, { useEffect, useState } from 'react';
import MachineSidebar from '../../Components/MachineSlidebar/MachineSidebar';
import { Link, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import axios from "axios";
import './SupplierDetails.css';




function SupplierDetails() {
  const [suppliers, setSuppliers] = useState([]);
//filter suppliers
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('http://localhost:2000/api/v1/get-suppliers');
        setSuppliers(response.data.reverse());
      } catch (error) {
        console.error(error);
        alert("Error fetching suppliers");
      }
    };
    fetchSuppliers();
  }, []);

  // Delete Supplier Function
  const deleteSupplier = async (id) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      try {
        await axios.delete(`http://localhost:2000/api/v1/delete-supplier/${id}`);
        setSuppliers(suppliers.filter(sup => sup._id !== id));
      } catch (error) {
        console.error(error);
        alert("Failed to delete supplier");
      }
    }
  };


  //download pdf
 const downloadPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.setTextColor(40);
  doc.text("Supplier Report", 14, 22);

  const tableColumn = ["S No", "Name", "Phone", "Email", "Location"];
  const tableRows = [];

  suppliers.forEach((sup, index) => {
    const rowData = [
      index + 1,
      sup.name,
      sup.phone,
      sup.email,
      sup.location
    ];
    tableRows.push(rowData);
  });

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 30,
    theme: 'striped',
    styles: {
      fontSize: 10,
      cellPadding: 4,
      textColor: [44, 44, 44],      // PDF only
      halign: 'left',
    },
    headStyles: {
      fillColor: [30, 21, 74],       // PDF only (your sidebar purple)
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      halign: 'center',
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],    // PDF only zebra stripes
    },
    margin: { top: 30 },
  });

  doc.save('Supplier_Report.pdf');
};





  //  Filter suppliers based on search input
  const filteredSuppliers = suppliers.filter(sup =>
    sup.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Define columns with action buttons
  const columns = [
    { name: "S No", selector: (row, index) => index + 1 },
    { name: "Name", selector: row => row.name },
    { name: "phone", selector: row => row.phone },
    { name: "Email", selector: row => row.email },
    { name: "Location", selector: row => row.location },
    {
      name: "Action",
      cell: row => (
        <div>
          <button className='edit-btn' onClick={() => navigate(`/updateSupplier/${row._id}`, { state: { supplier: row } })}>Update  </button>
          
          <button className='delete-btn'  onClick={() => deleteSupplier(row._id)}>Delete</button>
        </div>
      )
    }
  ];


  
  

  return (
  <div className='supplier-details-container'>

     
      <MachineSidebar />
     


  <div className='content'>
          
       
     <h1 className="title">Supplier Details</h1>
       
    <div className="top-controls">
      <div className="add-button">
              <Link to="/addSupplier"><button>Add New Supplier</button></Link>
              <button className="download-btn" onClick={downloadPDF}>Download Report</button>
      </div>
      <div className="search-bar">
      <input
          type="text"
          placeholder="Search by Supplier Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        /> 
      </div>
 

    </div>
      

      <div className='react-data-table'>

      <DataTable columns={columns} data={filteredSuppliers} />
       </div>
  </div>
   </div>
    
  );
}

export default SupplierDetails;











