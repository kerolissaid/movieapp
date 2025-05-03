const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    index: true
  },
  plot: {
    type: String,
    required: [true, 'Plot is required']
  },
  releaseYear: {
    type: Number,
    required: true,
  },
  runtime: {
    type: Number,
    required: [true, 'Runtime is required'],
    min: [1, 'Runtime must be at least 1 minute']
  },
  genres: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre'
  }],
  directors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person'
  }],
  cast: [{
    person: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Person',
      required: true
    },
    character: {
      type: String,
      required: true
    }
  }],
  posterUrl: {
    type: String,
    required: true
  },
  trailerUrl: String,
  videoUrl: {
  type: String,
  required: [true, 'Video URL is required']
  }
}, {
  timestamps: true
});

// Text index for search
movieSchema.index({ title: 'text', plot: 'text' });
// Unique index to prevent duplicate movies
movieSchema.index({ title: 1, releaseYear: 1 }, { unique: true });

module.exports = mongoose.model('Movie', movieSchema);