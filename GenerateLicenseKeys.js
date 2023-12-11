// LicenseGeneratorPage.js
import React, { useState, useEffect } from 'react';
import '../../Styles/adminlicensegenerator.css'; // Import your CSS file

const LicenseGeneratorPage = () => {
  const [licenses, setLicenses] = useState([]);

  useEffect(() => {
    // Fetch licenses with null key from your server
    const fetchLicenses = async () => {
      try {
        const response = await fetch('http://localhost:4001/license/generateKeys');
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

  const generateLicenseKey = async (licenseId) => {
    try {
      const response = await fetch(`http://localhost:4001/license/updateKey/${licenseId}`, {
        method: 'PUT',
      });

      if (response.ok) {
        // Refresh the licenses after generating a key
        const updatedLicenses = await response.json();
        setLicenses(updatedLicenses);
        alert("license Key is generated.")
      } else {
        console.error('Failed to generate license key');
      }
    } catch (error) {
      console.error('Error during key generation:', error);
    }
  };

  return (
    <div className="license-generator-container">
      <h2>License Generator</h2>
      {licenses.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>License ID</th>
              <th>Product ID</th>
              <th>User ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {licenses.map((license) => (
              <tr key={license._id}>
                <td>{license._id}</td>
                <td>{license.product}</td>
                <td>{license.user}</td>
                <td>
                  <button onClick={() => generateLicenseKey(license._id)}>
                    Generate License Key
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No licenses available.</p>
      )}
    </div>
  );
};

export default LicenseGeneratorPage;
