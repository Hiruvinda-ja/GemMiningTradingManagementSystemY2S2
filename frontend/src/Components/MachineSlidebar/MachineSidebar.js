/*import React from 'react'
import {Link} from "react-router-dom";
import './MachineSidebar.css';


function MachineSidebar() {
  return (
    <div className='machine-sidebar-container'>
        <div>
            <h3>GMTMS</h3>
        </div>
        <div className='machine-sidebar'>
        <Link to="/machine-dashboard" >
                <span>Dashboard</span>
            </Link>
            <br></br>
            <Link to="/supplierDetails">
                <span>Supplier</span>
            </Link>
            <br></br>

            <Link to="/machineDetails">
                <span>Machines</span>
            </Link>
        </div>
    </div>
  )
}

export default MachineSidebar*/
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './MachineSidebar.css';

function MachineSidebar() {
  const location = useLocation(); // Get the current location (URL) from React Router
  const [activeLink, setActiveLink] = useState('');

  /*useEffect(() => {
    // Set the active link based on the current path
    if (location.pathname === '/machine-dashboard') {
      setActiveLink('machine-dashboard');
    } else if (
      location.pathname === '/supplierDetails') {
      setActiveLink('supplierDetails');
    } else if (location.pathname === '/machineDetails') {
      setActiveLink('machineDetails');
    }
    // Add more paths if needed
  }, [location]);*/


  useEffect(() => {
    // Dynamically set active link based on the current path
    if (location.pathname === '/machine-dashboard') {
      setActiveLink('machine-dashboard');
    } 
    // For all routes related to Supplier
    else if (
      location.pathname.startsWith('/supplierDetails') || 
      location.pathname.startsWith('/addSupplier') || 
      location.pathname.startsWith('/updateSupplier')
    ) {
      setActiveLink('supplierDetails');
    } 
    // For all routes related to Machine
    else if (
      location.pathname.startsWith('/machineDetails') || 
      location.pathname.startsWith('/addMachine') || 
      location.pathname.startsWith('/updateMachine') || 
      location.pathname.startsWith('/viewMachine')
    ) {
      setActiveLink('machineDetails');
    }
  }, [location]);




  return (
    <div className='machine-sidebar-container'>
      <div>
        <h3>CRYSTALCORE</h3> 
      </div>
     
      <div className='machine-sidebar'>
        <Link
          to="/machine-dashboard"
          className={activeLink === 'machine-dashboard' ? 'active' : ''}
        >
          <span>Dashboard</span>
        </Link>
        <br />
        <Link
          to="/supplierDetails"
          className={activeLink === 'supplierDetails' ? 'active' : ''}
        >
          <span>Supplier Management</span>
        </Link>
        <br />
        <Link
          to="/machineDetails"
          className={activeLink === 'machineDetails' ? 'active' : ''}
        >
          <span>Machine Management</span>
        </Link>

        
      </div>
    </div>
  );
}

export default MachineSidebar;
