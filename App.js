
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
// import AdminDashboard from './pages/AdminDashboard';
// import CustomerDashboard from './pages/CustomerDashboard';
// import Login from './pages/Login';
// import AddPage from './componenets/Admin/AddProduct'
// import LicenseGeneratorPage from './componenets/Admin/GenerateLicenseKeys'
// import ViewLicensesPage from './componenets/Admin/ViewGeneratedLicenses'
// import ViewProductPage from './componenets/Customer/ViewProducts';
// import { useAuth } from './AuthContext'; // Update with the correct path

// function App() {
//   // State to track the logged-in user and their role
//   const [loggedInUser, setLoggedInUser] = useState(null);

//   // Function to handle user login
//   // const handleLogin = (user) => {
//   //   setLoggedInUser(user);
//   // };

 


//   const { user } = useAuth();


//   return (
//     <Router>
      

//       <Routes>
//         <Route path="/" element={!loggedInUser ? <Login  /> : <Navigate to={loggedInUser === 'admin' ? '/admin' : '/customer'} />} />
//         <Route path="/admin" element={loggedInUser === 'admin' ? <AdminDashboard /> : null} />
//         <Route path="/customer" element={loggedInUser === 'customer' ? <CustomerDashboard /> : null} />
//         <Route path="/add-product" element={<AddPage />} /> {/* New Route for AddProductPage */}
//         <Route path="/generate-license" element={<LicenseGeneratorPage />} /> {/* New Route for AddProductPage */}
//         <Route path="/view-license" element={<ViewLicensesPage />} />
//         <Route path="/view-products" element={<ViewProductPage/>} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import Login from './pages/Login';
import AddPage from './componenets/Admin/AddProduct';
import LicenseGeneratorPage from './componenets/Admin/GenerateLicenseKeys';
import ViewLicensesPage from './componenets/Admin/ViewGeneratedLicenses';
import ViewProductPage from './componenets/Customer/ViewProducts';
import { useAuth } from './AuthContext'; // Update with the correct path
import ViewLicenseStatus from './componenets/Customer/ViewLicenseStatus';

function App() {
  // Get user information from the authentication context
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={!user ? <Login /> : <Navigate to={user.role === 'admin' ? '/admin' : '/customer'} />} />
        <Route path="/admin" element={user && user.role === 'admin' ? <AdminDashboard /> : null} />
        <Route path="/customer" element={user && user.role === 'customer' ? <CustomerDashboard /> : null} />
        <Route path="/add-product" element={<AddPage />} />
        <Route path="/generate-license" element={<LicenseGeneratorPage />} />
        <Route path="/view-license" element={<ViewLicensesPage />} />
        <Route path="/view-products" element={<ViewProductPage />} />
        <Route path="/view-license-status" element={<ViewLicenseStatus/>} />
      </Routes>
    </Router>
  );
}

export default App;
