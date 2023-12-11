import React, { useState, useEffect } from 'react';
import '../../Styles/ViewProductStyles.css'; // Import your CSS file
import { useAuth } from '../../AuthContext';


const ViewProductPage = () => {
  const [products, setProducts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    // Fetch products from your server, use user.userId as needed
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4001/product/getProducts');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error during product fetch:', error);
      }
    };

    fetchProducts();
  }, [user]); // Include user as a dependency to re-fetch products on user changes


  const handleBuyClick = async (productId) => {
    try {
      // Include user ID in the request
      console.log(user.userId)
      console.log(productId)
      const response = await fetch(`http://localhost:4001/license/saveLicense/${user.userId}/${productId}`, {
        method: 'POST',
      });

      if (response.ok) {
        alert('License saved successfully!');
      } else {
        console.error('Failed to save license');
      }
    } catch (error) {
      console.error('Error during license save:', error);
    }
  };

  return (
    <div className="view-product-container">
      <h2>View Products</h2>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Version</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.version}</td>
              <td>{product.description}</td>
              <td>
                <button onClick={() => handleBuyClick(product._id)}>
                  Buy
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewProductPage;
