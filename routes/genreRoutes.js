const router = require('express').Router();
const {
  getAllGenres,
  getGenre,
  createGenre,
  updateGenre,
  deleteGenre
} = require('../controllers/genreController');
const { protect, restrictToAdmin } = require('../middlewares/authMiddleware');

// Public routes
router.use(protect);
router.get('/', getAllGenres);
router.get('/:id', getGenre);

// Protected admin routes
router.use(restrictToAdmin);
router.post('/', createGenre);
router.patch('/:id', updateGenre);
router.delete('/:id', deleteGenre);

module.exports = router;