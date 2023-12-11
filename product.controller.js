// product.controller.js

const Product = require('../models/Product');




const addProduct = (req, res) => {
  const { name, version, description } = req.body;
  console.log("I am in addproduct")
  // Validate input
  if (!name || !version || !description) {
    return res.status(400).json({ error: 'Name, version, and description are required fields.' });
  }

  // Create a new product
  const newProduct = new Product({
    name,
    version,
    description,
  });

  // Save the product to the database
  newProduct
    .save()
    .then((product) => {
      res.status(201).json({ success: true, product });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

const getProducts = async (req,res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products); // Send the products as a JSON response
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ error: 'Internal Server Error' }); // Send an error response
  }
}



  

module.exports = {
  addProduct,
  getProducts
};
