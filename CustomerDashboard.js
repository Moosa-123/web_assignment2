import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/customerDashboard.css'; // Import your CSS file

const CustomerDashboard = () => {
  return (
    <div>
    <h2>Customer Dashboard</h2>
    <div className="customer-dashboard">


      <div className="dashboard-card">
        <h3>View Products</h3>
        <p>Explore available products</p>
        <Link to="/view-products">Go to View Products</Link>
      </div>

      <div className="dashboard-card">
        <h3>View License Status</h3>
        <p>Check the status of your licenses</p>
        <Link to="/view-license-status">Go to View Licenses</Link>
      </div>
    </div>
    </div>
  );
};

export default CustomerDashboard;
