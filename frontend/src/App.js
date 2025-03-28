import React from 'react';
import{Route,Routes} from "react-router";
import './App.css';
import MachineDashboard from './pages/Dashboard/MachineDashboard';
import SupplierDetails from './pages/Supplier/SupplierDetails';
import MachineDetails from './pages/Machine/MachineDetails';
import AddSupplier from './pages/Supplier/AddSupplier';
import UpdateSupplier from './pages/Supplier/UpdataSupplier';
import AddMachine from './pages/Machine/AddMachine';
import UpdateMachine from './pages/Machine/UpdateMachine';
import ViewMachine from './pages/Machine/ViewMachine';
//import View from './pages/Machine/View';
/*import MachineDashboard from './pages/MachineDashboard';
import SupplierDetails from './pages/SupplierDetails';
import MachineDetails from './pages/MachineDetails';*/

function App() {
  return (
    <div >
     
    
    <React.Fragment>
      <Routes>
        <Route path="/" element={<MachineDashboard/>}/>
        <Route path="/machine-dashboard" element={<MachineDashboard/>}/>
        <Route path="/supplierDetails" element={<SupplierDetails/>}/>
        <Route path="/machineDetails" element={<MachineDetails/>}/>
        <Route path="/addSupplier" element={<AddSupplier/>}/>
        <Route path="/updateSupplier/:id" element={<UpdateSupplier/>}/>

        <Route path="/addMachine" element={<AddMachine/>}/>
        <Route path="/updateMachine/:id" element={<UpdateMachine/>}/>
        <Route path="/viewMachine/:id" element={<ViewMachine/>}/>
       




      </Routes>
    </React.Fragment>




    </div>
  );
}

export default App;
