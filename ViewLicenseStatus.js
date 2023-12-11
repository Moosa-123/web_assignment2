import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext';
//const mongoose = require('mongoose');


const ViewLicenseStatus = () => {
    const [licenses, setLicenses] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        // Fetch licenses for the logged-in user from your server
        //let UserId=user.userId;
        const fetchLicenses = async () => {
            //console.log(user.userId)
            console.log(user.userId)
            //const userId = mongoose.Types.ObjectId(user.userId);
            try {
                const response = await fetch(`http://localhost:4001/license/licenseStatus/${user.userId}`);
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

    const handleActivationKeyChange = async (licenseId, event) => {
        const key = event.target.value;

        try {
            const response = await fetch(`http://localhost:4001/license/updateStatus/${licenseId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Key: key }),
            });

            if (response.ok) {
                // Update the license state or perform other actions if needed
                const updatedLicenses = [...licenses];
                const updatedLicenseIndex = updatedLicenses.findIndex((license) => license.id === licenseId);
                updatedLicenses[updatedLicenseIndex].key = key;
                setLicenses(updatedLicenses);
                alert("Product has been activated")
            } else {
                console.error('Failed to update activation key');
            }
        } catch (error) {
            console.error('Error during activation key update:', error);
        }
    };


    return (
        <div>
            <h2>View License Status</h2>
            {licenses.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Product Id</th>
                            <th>License Status</th>
                            <th>Activation Key Input</th>
                            <th>Activation Key</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {licenses.map((license) => (
                            <tr key={license._id}>
                                <td>{license.product}</td>
                                <td>{license.activated.toString()}</td>
                                <td>
                                    <input
                                        type="text"
                                        value={license.Key}
                                        onChange={(event) => handleActivationKeyChange(license._id, event)}
                                        disabled={license.activated} // Disable input if license is activated
                                    />
                                </td>
                                <td>{license.key}</td>
                               
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
export default ViewLicenseStatus;