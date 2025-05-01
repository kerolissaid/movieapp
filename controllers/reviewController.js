const Review = require('../models/reviewModel');
const Movie = require('../models/movieModel');

const getMovieReviews = async (req, res) => {
  try {
      const reviews = await Review.find({ movie: req.params.movieId })
          .populate('user', 'username profilePicture').sort('-createdAt');

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch reviews',
      error: err.message
    });
  }
};

// Get current user reviews
const getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.user.id })
      .populate('movie', 'title posterUrl')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch your reviews',
      error: err.message
    });
  }
};


const createReview = async (req, res) => {
  try {
    // Check if movie exists
    const movie = await Movie.findById(req.params.movieId);
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }

    // Check if user already reviewed this movie
    const existingReview = await Review.findOne({
      movie: req.params.movieId,
      user: req.user.id
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this movie'
      });
    }

    const review = await Review.create({
      movie: req.params.movieId,
      user: req.user.id,
      comment: req.body.comment
    });

    // Populate user data in the response
    await review.populate('user', 'username profilePicture');

    res.status(201).json({
      success: true,
      data: review
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: err.message
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to create review',
      error: err.message
    });
  }
};


const updateReview = async (req, res) => {
  try {
    const review = await Review.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id // Ensure only the review owner can update
      },
      { comment: req.body.comment },
      { new: true, runValidators: true }
    ).populate('user', 'username profilePicture');

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found or you are not authorized'
      });
    }

    res.status(200).json({
      success: true,
      data: review
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to update review',
      error: err.message
    });
  }
};


const deleteReview = async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id // Ensure only the review owner can delete
    });
    console.log(review);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found or you are not authorized'
      });
    }

    res.status(204).json({
      success: true,
      data: null
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete review',
      error: err.message
    });
  }
};

module.exports = {
  getMovieReviews,
  getMyReviews,
  createReview,
  updateReview,
  deleteReview
};