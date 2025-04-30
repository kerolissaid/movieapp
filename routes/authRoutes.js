const router = require('express').Router();
const {signup, login} = require('../controllers/authController');
const {protect, restrictToAdmin} = require('../middlewares/authMiddleware');
const {validateUserSignup, validateUserLogin} = require('../middlewares/authValidationMiddleware');

// authentication routes
router.post('/signup', validateUserSignup, signup);
router.post('/login', validateUserLogin, login);

// protected routes (require authentication)
router.use(protect);


// Admin-only routes
router.use(restrictToAdmin);

module.exports = router;