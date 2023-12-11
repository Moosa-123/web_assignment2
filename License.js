const mongoose = require('mongoose');

const licenseSchema = new mongoose.Schema({
  key: {
    type: String,
    required: false,
    default:null,
    unique:false
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  activated: {
    type: Boolean,
    default: false,
  },
});

const License = mongoose.model('License', licenseSchema);

module.exports = License;
