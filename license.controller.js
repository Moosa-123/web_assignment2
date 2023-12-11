const License = require('../models/License'); // Update the path to your license model
const Product = require('../models/Product');
const User = require('../models/User')


function generateKey(){
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
  
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      key += characters.charAt(randomIndex);
    }
  
    return key;
}



const getLicensesWithNullKey = async (req,res) => {
    try {
        const licenses = await License.find({ key: null });
        res.status(200).json(licenses); // Send the licenses as a JSON response
      } catch (error) {
        console.error('Error fetching licenses with null key:', error.message);
        res.status(500).json({ error: 'Internal Server Error' }); // Send an error response
      }
    }


    const generateLicense = async (req, res) => {
      const { userId, productId } = req.params;
      console.log(userId,productId)
      try {
        // Check if the product exists
        const existingProduct = await Product.findById(productId);
    
        if (!existingProduct) {
          return res.status(404).json({ error: 'Product not found' });
        }
    
        // Generate a license key
        // const licenseKey = generateKey(); // Replace with your actual key generation logic
    
        // Create a new license associated with the product and user
        const newLicense = new License({
          product: productId,
          user: userId,
        });
    
        // Save the license to the database
        await newLicense.save();
    
        // Update the user's activatedLicenses array
        await User.findByIdAndUpdate(
          userId,
          { $push: { activatedLicenses: newLicense._id } },
          { new: true }
        );
    
        res.status(201).json({ success: true, newLicense });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };
    

const getLicensesWithKeyNotNull = async (req,res) => {
    try {
        const licenses = await License.find({ key: { $ne: null } });
        res.status(200).json(licenses); // Send the licenses as a JSON response
      } catch (error) {
        console.error('Error fetching licenses with key not null:', error.message);
        res.status(500).json({ error: 'Internal Server Error' }); // Send an error response
      }
}

const getLicensesByUserId = async (req,res) => {
    
    const userId = req.params;
    //const { userId } = req.params; 
    console.log("this is user ID:", userId)
    try {
        const licenses = await License.find({ user: userId.userId });
        console.log(licenses)
        res.status(200).json(licenses); // Send the licenses as a JSON response
      } catch (error) {
        console.error('Error fetching licenses by user ID:', error.message);
        res.status(500).json({ error: 'Internal Server Error' }); // Send an error response
      }
}


const updateStatus = async (req,res) => {
    try {
        const enteredKey = req.body.Key;
        console.log(enteredKey)
        const licenseId = req.params.licenseId;
    
        // Find the license by ID
        const license = await License.findById(licenseId);
        console.log(license)
        if (!license) {
          res.status(404).json({ error: 'License not found' });
          return;
        }
    
        const { key: licenseKey } = license;
        console.log(enteredKey)
        console.log(licenseKey)
        // Check if enteredKey matches the licenseKey
        if (enteredKey !== licenseKey) {
          res.status(400).json({ error: 'Incorrect license key' });
          return;
        }
    
        // Update activation status to true
        license.activated = true;
        await license.save();
    
        res.status(200).json({ message: 'License activated successfully' });
      } catch (error) {
        console.error('Error activating license:', error.message);
        res.status(500).json({ error: 'Internal Server Error' }); // Send an error response
      }
}

const updateKey = async (req,res) =>{
    try {
        const { licenseId } = req.params;
    
        // Check if licenseId is provided
        if (!licenseId) {
          res.status(400).json({ error: 'License ID is required' });
          return;
        }
    
        // Generate a new key
        const newKey = generateKey(); 
    
        // Find the license by ID and update the key
        const updatedLicense = await License.findByIdAndUpdate(
          licenseId,
          { key: newKey },
          { new: true }
        );
    
        if (!updatedLicense) {
          res.status(404).json({ error: 'License not found' });
          return;
        }
    
        res.status(200).json({ message: 'License key updated successfully', newKey });
      } catch (error) {
        console.error('Error updating license key:', error.message);
        res.status(500).json({ error: 'Internal Server Error' }); // Send an error response
      }
}

  module.exports = {
    getLicensesWithNullKey,
    generateLicense,
    getLicensesWithKeyNotNull,
    getLicensesByUserId,
    updateStatus,
    updateKey
  };