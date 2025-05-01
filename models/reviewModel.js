const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: [true, 'Movie is required']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  comment: {
    type: String
  }
}, {
  timestamps: true
});

// Prevent duplicate reviews
reviewSchema.index({ movie: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);