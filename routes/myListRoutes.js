const router = require('express').Router();
const {
  getLists,
  addToFavorites,
  removeFromFavorites,
  addToWatchlist,
  removeFromWatchlist
} = require('../controllers/myListController');
const { protect, restrictToAdmin } = require('../middlewares/authMiddleware');

// Protect all routes
router.use(protect);

// Get user lists
router.get('/', getLists);

// Favorites operations
router.post('/favorites/:movieId',addToFavorites);
router.delete('/favorites/:movieId',removeFromFavorites);

// Watchlist operations
router.post('/watchlist/:movieId', addToWatchlist);
router.delete('/watchlist/:movieId', removeFromWatchlist);

module.exports = router;