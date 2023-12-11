import React, { useState } from 'react';
import '../../Styles/addProductStyles.css';

const AddPage = () => {
  const [formData, setFormData] = useState({
    productName: '',
    version: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4001/product/add-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Product added successfully
        alert('Product added in the database!');
      } else {
        // Handle error if product addition fails
        alert('Failed to add product. Please try again.');
      }
    } catch (error) {
      console.error('Error during product addition:', error);
      alert('An error occurred during product addition. Please try again.');
    }
  };

  return (
    <div className="add-product-container">
    <div className='add-product-card'>  
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="version">Version:</label>
          <input
            type="text"
            id="version"
            name="version"
            value={formData.version}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div>
          <button type="submit">Add Product</button>
        </div>
      </form>
     </div>
    </div>
  );
};

export default AddPage;
