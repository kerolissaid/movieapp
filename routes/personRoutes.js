const router = require('express').Router();
const {
  getAllPeople,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson
} = require('../controllers/personController');
const { protect, restrictToAdmin } = require('../middlewares/authMiddleware');

// Protected admin routes
router.use(protect);
router.use(restrictToAdmin);
router.post('/', createPerson);
router.get('/', getAllPeople);
router.patch('/:id', updatePerson);
router.delete('/:id', deletePerson);
router.get('/:id', getPerson);
module.exports = router;