const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password:{
    type: String,
    required:true
  },
  role: {
    type: String,
    enum: ['admin', 'customer'],
    default: 'customer',
  },
  activatedLicenses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'License',
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
