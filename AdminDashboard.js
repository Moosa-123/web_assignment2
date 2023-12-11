//import React from 'react';




// export default function AdminDashboard () {
//     return (
//         <div className='body'>
//         <div className="admin-dashboard">
//           <div className="dashboard-card">
//             <h3>Add New Product</h3>
//             <button>Add Product</button>
//           </div>
//           <div className="dashboard-card">
//             <h3>Generate License Key</h3>
//             <button>Generate Key</button>
//           </div>
//           <div className="dashboard-card">
//             <h3>View Licenses</h3>
//             <button>View Licenses</button>
//           </div>
//         </div>
//         </div>
//       );
// }


// AdminDashboard.jsimport React from 'react';
import { Link, Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import '../Styles/adminDashboard.css';
import AddPage from '../componenets/Admin/AddProduct';

const AdminDashboard = () => {
  return (
       <div className='body'>
        <div className="admin-dashboard">
          <div className="dashboard-card">
            <h3>Add New Product</h3>
            <Link to="/add-product">
              <button>Add Product</button>
            </Link>
          </div>
          <div className="dashboard-card">
            <h3>Generate License Key</h3>
            <Link to="/generate-license">
            <button>Generate Key</button>
            </Link>
          </div>
          <div className="dashboard-card">
            <h3>View Licenses</h3>
            <Link to="/view-license">
            <button>View Licenses</button>
            </Link>
          </div>

          

        </div>
      </div>
   
  );
};

export default AdminDashboard;
