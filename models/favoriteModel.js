const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
},{timestamps: true});

// Ensure unique combination
favoriteSchema.index({ user: 1, movie: 1 }, { unique: true });

module.exports = mongoose.model('Favorite', favoriteSchema);