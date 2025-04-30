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
    min: [1888, 'No movies existed before 1888'],
    max: [new Date().getFullYear() + 2, 'Release year seems too far in future']
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
}, {
  timestamps: true
});

// Text index for search
movieSchema.index({ title: 'text', plot: 'text' });

module.exports = mongoose.model('Movie', movieSchema);