const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  bio: String,
  birthDate: Date,
  deathDate: Date,
  photoUrl: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Person', personSchema);