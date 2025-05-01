const router = require('express').Router();
const {
  getAllMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
  searchMovies
} = require('../controllers/movieController');
const { protect, restrictToAdmin } = require('../middlewares/authMiddleware');

// Public routes
router.use(protect);
router.get('/', getAllMovies);
router.get('/search', searchMovies);
router.get('/:id', getMovie);

// Protected admin routes
router.use(restrictToAdmin);
router.post('/', createMovie);
router.patch('/:id', updateMovie);
router.delete('/:id', deleteMovie);

module.exports = router;