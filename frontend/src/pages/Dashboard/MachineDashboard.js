/*import React from 'react'
import MachineSidebar from '../../Components/MachineSlidebar/MachineSidebar'

function MachineDashboard() {
  return (
    <div>
        <MachineSidebar/>
        <h2>welcome to machine dashboard</h2>
        
    </div>
  )
}

export default MachineDashboard*/


import React from 'react';
import MachineSidebar from '../../Components/MachineSlidebar/MachineSidebar';

function MachineDashboard() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div style={{ width: "250px", flexShrink: 0 }}>
        <MachineSidebar />
      </div>

      {/* Main Content */}
      <div
        style={{
          flexGrow: 1,
          padding: "20px",
          background: "#f5f5f5",
          display: "flex",
          justifyContent: "center", // Centers horizontally
          alignItems: "center", // Centers vertically
        }}
      >
        <div style={{ textAlign: "center", width: "100%" }}>
          <h2 style={{ marginBottom: "20px" }}>Machine Dashboard</h2>

          {/* Chart Containers */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              justifyContent: "center", // Centers the grid inside the container
            }}
          >
            {/* Chart 1 */}
            <div style={chartContainerStyle}>
              <h3>Machine Category Distribution</h3>
              <iframe
                style={iframeStyle}
                src="https://charts.mongodb.com/charts-gemproject-ikhtpyn/embed/charts?id=49bbe1c9-dd8a-4d76-aa60-bc421a190ccb&maxDataAge=60&theme=light&autoRefresh=true"
                title="Machine Category Distribution Chart"
              ></iframe>
            </div>

            {/* Chart 2 */}
            <div style={chartContainerStyle}>
              <h3>Machine Price Comparison</h3>
              <iframe
                style={iframeStyle}
                src="https://charts.mongodb.com/charts-gemproject-ikhtpyn/embed/charts?id=c83e55f8-7d4e-418e-ac00-96311bcbb030&maxDataAge=60&theme=light&autoRefresh=true"
                title="Machine Price Comparison Chart"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Styles
const chartContainerStyle = {
  background: "#ffffff",
  padding: "15px",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
};

const iframeStyle = {
  width: "100%",
  height: "400px", // Adjusted height for better view
  border: "none",
  borderRadius: "5px",
  boxShadow: "0 2px 10px rgba(70, 76, 79, .2)",
};

export default MachineDashboard;
