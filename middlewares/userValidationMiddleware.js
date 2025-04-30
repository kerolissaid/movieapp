const { body, validationResult } = require('express-validator');

const validateUserAndUpdateByUser =  [
    body('username')
      .optional()
      .isLength({ min: 3, max: 30 })
      .withMessage('Username must be 3–30 characters'),
    body('email')
      .optional()
      .isEmail()
      .withMessage('Valid email required'),
       body('password')
      .optional()
      .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters'),
         (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validateUserAndUpdateByAdmin =  [
    body('username')
      .optional()
      .isLength({ min: 3, max: 30 })
      .withMessage('Username must be 3–30 characters'),
    body('email')
      .optional()
      .isEmail()
      .withMessage('Valid email required'),
    body('role')
      .optional()
      .isIn(['user', 'admin'])
    .withMessage('Role must be user or admin'),
    (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateUserAndUpdateByUser,validateUserAndUpdateByAdmin };