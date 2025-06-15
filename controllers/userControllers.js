const { User } = require('../models/user');
const bcrypt = require('bcryptjs');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-passwordHash');
    res.send(users);
  } catch {
    res.status(500).json({ success: false, message: 'Failed to fetch users.' });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-passwordHash');
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.send(user);
  } catch {
    res.status(500).json({ message: 'Error retrieving user.' });
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      passwordHash: bcrypt.hashSync(req.body.password, 10),
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
      street: req.body.street,
      apartment: req.body.apartment,
      zip: req.body.zip,
      city: req.body.city,
      country: req.body.country,
    });

    user = await user.save();

    if (!user) return res.status(400).send('The user could not be created.');

    res.send(user);
  } catch {
    res.status(500).send('Server error while creating user.');
  }
};

// Register user (same as create)
const registerUser = async (req, res) => {
  return createUser(req, res);
};

// Update user
const updateUser = async (req, res) => {
  try {
    const existingUser = await User.findById(req.params.id);
    if (!existingUser) return res.status(404).send('User not found.');

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        passwordHash: req.body.password
          ? bcrypt.hashSync(req.body.password, 10)
          : existingUser.passwordHash,
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
      },
      { new: true }
    );

    res.send(updatedUser);
  } catch {
    res.status(500).send('Error updating user.');
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndRemove(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    res.json({ success: true, message: 'User deleted successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

// Get user count
const getUserCount = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    res.send({ userCount });
  } catch {
    res.status(500).json({ success: false });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  registerUser,
  updateUser,
  deleteUser,
  getUserCount,
};
