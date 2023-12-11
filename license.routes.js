let mongoose = require("mongoose"),
  express = require("express");
  router = express.Router();
  const liceneController = require("../controllers/license.controller")
// Student Model
let licesnceSchema = require("../models/License");

const License = require('../models/License');



router.route('/generateKeys')
.get(liceneController.getLicensesWithNullKey)



router.route('/saveLicense/:userId/:productId')
.post(liceneController.generateLicense)


router.route('/viewGeneratedLicenses')
.get(liceneController.getLicensesWithKeyNotNull)

router.route('/licenseStatus/:userId')
.get(liceneController.getLicensesByUserId)

router.route('/updateKey/:licenseId')
.put(liceneController.updateKey)

router.route('/updateStatus/:licenseId')
.put(liceneController.updateStatus)


module.exports = router;