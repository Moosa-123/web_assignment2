let mongoose = require("mongoose"),
  express = require("express");
  router = express.Router();
  const ProductController = require('../controllers/product.controller');
// Student Model
let productSchema = require("../models/Product");

router.route('/add-product')
.post(ProductController.addProduct);

router.route('/getProducts')
.get(ProductController.getProducts);



module.exports = router;
