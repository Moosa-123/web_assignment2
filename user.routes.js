let mongoose = require("mongoose"),
  express = require("express");
  router = express.Router();
  const UserController = require('../controllers/user.controller');
  //const ProductController = require('../controllers/product.controller');

// Student Model///
//let userSchema = require("../models/User");


//     const isAdmin = (req, res, next) => {
//     const user = req.user; // Assuming you have middleware that adds the user to the request object
//     console.log(user)
//     if (user && user.role === 'admin') {
//       // User is an admin, proceed to the next middleware or route handler
//       next();
//     } else {
//       // User is not an admin, return an error
//       res.status(403).json({ error: 'Permission denied. Only admin users can perform this action.' });
//     }
//   };
  
//console.log("HELLO")

router.route('/login').post(UserController.login)










module.exports = router;