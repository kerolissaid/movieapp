const Genre = require('../models/genreModel');


// public
const getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.find();
    res.status(200).json({
      success: true,
      count: genres.length,
      data: genres
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch genres',
      error: err.message
    });
  }
};

// public
const getGenre = async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    
    if (!genre) {
      return res.status(404).json({
        success: false,
        message: 'Genre not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: genre
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch genre',
      error: err.message
    });
  }
};

// Private/Admin
const createGenre = async (req, res) => {
  try {
    const newGenre = await Genre.create(req.body);
    res.status(201).json({
      success: true,
      data: newGenre
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Genre name already exists'
      });
    }
    res.status(400).json({
      success: false,
      message: 'Failed to create genre',
      error: err.message
    });
  }
};

// Private/Admin
const updateGenre = async (req, res) => {
  try {
    const genre = await Genre.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!genre) {
      return res.status(404).json({
        success: false,
        message: 'Genre not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: genre
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Genre name already exists'
      });
    }
    res.status(400).json({
      success: false,
      message: 'Failed to update genre',
      error: err.message
    });
  }
};

//  Private/Admin
const deleteGenre = async (req, res) => {
  try {
    const genre = await Genre.findByIdAndDelete(req.params.id);
    
    if (!genre) {
      return res.status(404).json({
        success: false,
        message: 'Genre not found'
      });
    }
    
    res.status(204).json({
      success: true,
      data: null
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete genre',
      error: err.message
    });
  }
};

module.exports = {
  getAllGenres,
  getGenre,
  createGenre,
  updateGenre,
  deleteGenre
};