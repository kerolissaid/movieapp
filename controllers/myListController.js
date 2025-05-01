const MyList = require('../models/myListModel');
const Movie = require('../models/movieModel');

// function to get or create users list
const getUserList = async (userId) => {
  let list = await MyList.findOne({ user: userId });
  if (!list) {
    list = await MyList.create({ user: userId });
  }
  return list;
};


const getLists = async (req, res) => {
  try {
    const list = await MyList.findOne({ user: req.user.id })
      .populate('favorites', 'title posterUrl releaseYear')
      .populate('watchlist', 'title posterUrl releaseYear');

    if (!list) {
      return res.status(200).json({
        success: true,
        data: { favorites: [], watchlist: [] }
      });
    }

    res.status(200).json({
      success: true,
      data: list
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch lists',
      error: err.message
    });
  }
};


const addToFavorites = async (req, res) => {
  try {
    // Check if movie exists
    const movie = await Movie.findById(req.params.movieId);
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }

    const list = await getUserList(req.user.id);
    
    // Check if already in favorites
    if (list.favorites.includes(req.params.movieId)) {
      return res.status(400).json({
        success: false,
        message: 'Movie already in favorites'
      });
    }

    list.favorites.push(req.params.movieId);
    await list.save();

    res.status(200).json({
      success: true,
      data: list
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to add to favorites',
      error: err.message
    });
  }
};


const removeFromFavorites = async (req, res) => {
  try {
    const list = await MyList.findOne({ user: req.user.id });
    
    if (!list) {
      return res.status(404).json({
        success: false,
        message: 'List not found'
      });
    }

    list.favorites = list.favorites.filter(
      movieId => movieId.toString() !== req.params.movieId
    );
    
    await list.save();

    res.status(200).json({
      success: true,
      data: list
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to remove from favorites',
      error: err.message
    });
  }
};


const addToWatchlist = async (req, res) => {
  try {
    // Check if movie exists
    const movie = await Movie.findById(req.params.movieId);
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }

    const list = await getUserList(req.user.id);
    
    // Check if already in watchlist
    if (list.watchlist.includes(req.params.movieId)) {
      return res.status(400).json({
        success: false,
        message: 'Movie already in watchlist'
      });
    }

    list.watchlist.push(req.params.movieId);
    await list.save();

    res.status(200).json({
      success: true,
      data: list
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to add to watchlist',
      error: err.message
    });
  }
};


const removeFromWatchlist = async (req, res) => {
  try {
    const list = await MyList.findOne({ user: req.user.id });
    
    if (!list) {
      return res.status(404).json({
        success: false,
        message: 'List not found'
      });
    }

    list.watchlist = list.watchlist.filter(
      movieId => movieId.toString() !== req.params.movieId
    );
    
    await list.save();

    res.status(200).json({
      success: true,
      data: list
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to remove from watchlist',
      error: err.message
    });
  }
};

module.exports = {
  getLists,
  addToFavorites,
  removeFromFavorites,
  addToWatchlist,
  removeFromWatchlist
};