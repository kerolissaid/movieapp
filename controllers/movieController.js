const Movie = require('../models/movieModel');
const Genre = require('../models/genreModel');

// Get all movies (Public)
const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().populate('genres directors cast.person');
    res.status(200).json({
      success: true,
      count: movies.length,
      data: movies
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch movies',
      error: err.message
    });
  }
};

// Get single movie (Public)
const getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)
      .populate('genres directors cast.person');
    
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: movie
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch movie',
      error: err.message
    });
  }
};

// Create movie (Admin only)
const createMovie = async (req, res) => {
  try {
    const newMovie = await Movie.create(req.body);
    res.status(201).json({
      success: true,
      data: newMovie
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Movie with the same title and release year already exists'
      });
    }

    res.status(400).json({
      success: false,
      message: 'Failed to create movie',
      error: err.message
    });
  }
};

// Update movie (Admin only)
const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: movie
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Failed to update movie',
      error: err.message
    });
  }
};

// Delete movie (Admin only)
const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }
    
    res.status(204).json({
      success: true,
      data: null
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete movie',
      error: err.message
    });
  }
};

// Search movies (Public)
const searchMovies = async (req, res) => {
  try {
    const { query, genreName, releaseYear } = req.query;

    let filter = {};
    if (query) {
      filter.$text = { $search: query };
    }
    
    if (releaseYear) {
      filter.releaseYear = releaseYear;
    }

    if (genreName) {
      const genreDoc = await Genre.findOne({ name: genreName });
      if (!genreDoc) {
        return res.status(404).json({
          success: false,
          message: 'Genre not found'
        });
      }
      filter.genres = genreDoc._id;
    }
    //console.log(filter);
    // { genres: new ObjectId('6812a1c6c733384b3ae3d2b6') }
    //{ '$text': { '$search': 'Blood' } }
    const movies = await Movie.find(filter)
      .populate('genres directors cast.person');

    res.status(200).json({
      success: true,
      count: movies.length,
      data: movies
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Search failed',
      error: err.message
    });
  }
};

module.exports = {
  getAllMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
  searchMovies
};