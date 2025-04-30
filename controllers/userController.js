const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// Get current user profile
const getMe = async (req, res) => {
  try {
      res.status(200).json({
        status: 'success',
        data: {
          user: req.user
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching profile'
      });
    }
};

// Update current user
const updateMe = async (req, res) => {
  const updates = {};
  const allowedFields = ['username', 'email', 'profilePicture', 'password'];

  allowedFields.forEach(field => {
    if (req.body[field]) updates[field] = req.body[field];
  });

  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 12);
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser
      }
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

// Delete current user (except admin accounts)
const deleteMe = async (req, res) => {
  try {

    if (req.user.role === 'admin') {
      return res.status(400).json({
        status: 'fail',
        message: 'Admin accounts cannot be deleted from this endpoint!'
      });
    }

    await User.findByIdAndDelete(req.user._id);

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while deleting the user'
    });
  }
};


// ------------------------------------------- ADMIN ONLY ------------------------
// Get all users (admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({role: 'user'}); // just users
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: { users }
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

// Update any user by ID (admin only)
const updateUserById = async (req, res) => {
  const updates = {};
  const allowedFields = ['username', 'email', 'role'];

  allowedFields.forEach(field => {
    if (req.body[field]) updates[field] = req.body[field];
  });

  try {
    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true
    }).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ status: 'success', data: { user } });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete any user by ID (admin only)
const deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getMe, updateMe, deleteMe, getAllUsers, updateUserById, deleteUserById};