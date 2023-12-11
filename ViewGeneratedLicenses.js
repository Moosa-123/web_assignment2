import React, { useState, useEffect } from 'react';
import '../../Styles/viewAdminLicenses.css'

const ViewLicensesPage = () => {
  const [licenses, setLicenses] = useState([]);

  useEffect(() => {
    // Fetch licenses from your server
    const fetchLicenses = async () => {
      try {
        const response = await fetch('http://localhost:4001/license/viewGeneratedLicenses');
        if (response.ok) {
          const data = await response.json();
          setLicenses(data);
        } else {
          console.error('Failed to fetch licenses');
        }
      } catch (error) {
        console.error('Error during license fetch:', error);
      }
    };

    fetchLicenses();
  }, []);

  return (
    <div>
      <h2>View Licenses</h2>
      <table>
        <thead>
          <tr>
            <th>License Key</th>
            <th>User ID</th>
            <th>Activation Status</th>
          </tr>
        </thead>
        <tbody>
          {licenses.map((license) => (
            <tr key={license._id}>
              <td>{license.key}</td>
              <td>{license.user}</td>
              <td>{license.activated ? 'Activated' : 'Not Activated'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewLicensesPage;
