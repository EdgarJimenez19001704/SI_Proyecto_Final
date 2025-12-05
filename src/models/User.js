const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  walletBalance: { 
    type: Number, 
    default: 1000
  },
  role: {
    type: String,
    default: 'trader',
    enum: ['trader', 'admin']
  },
  portfolio: [{
    symbol: String,
    quantity: Number
  }]
});

module.exports = mongoose.model('User', userSchema);