const router = require('express').Router();
const { protect, restrictToAdmin } = require('../middlewares/authMiddleware');
const {  getMe, updateMe, deleteMe, getAllUsers, updateUserById, deleteUserById} = require('../controllers/userController');
const { validateUserAndUpdateByUser, validateUserAndUpdateByAdmin} = require('../middlewares/userValidationMiddleware');

router.use(protect);

router.get('/me', getMe);
router.patch('/me',validateUserAndUpdateByUser, updateMe);
router.delete('/me', deleteMe);

// admin routes
router.use(restrictToAdmin);

router.get('/', getAllUsers);
router.patch(
  '/:id',
  validateUserAndUpdateByAdmin,
  updateUserById
);

router.delete('/:id', deleteUserById);
module.exports = router;
