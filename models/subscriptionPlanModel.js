const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ['Basic', 'Standard', 'Premium', 'VIP', 'Family', 'Student'],
    default: 'Basic'
  },
  price: {
    type: Number,
    required: true
  },
  durationDays: { 
    type: Number,
    required: true,
    default: 30
  }
}, { timestamps: true });

module.exports = mongoose.model('Plan', planSchema);