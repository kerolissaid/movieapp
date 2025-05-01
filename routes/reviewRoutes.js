const router =  require('express').Router();
const {
  getMovieReviews,
  getMyReviews,
  createReview,
  updateReview,
  deleteReview
} = require('../controllers/reviewController');
const { protect } = require('../middlewares/authMiddleware');

// Public routes
router.get('/movies/:movieId/reviews', getMovieReviews);

// Protected routes
router.use(protect);

router.get('/reviews/me', getMyReviews);
router.post('/movies/:movieId/reviews', createReview);
router.patch('/reviews/:id', updateReview);
router.delete('/reviews/:id', deleteReview);

module.exports = router;