import User from '../models/UserModel.js';
import bcrypt from 'bcryptjs';

// @desc    Get current user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc    Update user profile
export const updateProfile = async (req, res) => {
  try {
    const { fullName, password } = req.body;

    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (fullName) user.fullName = fullName;
    if (password) user.password = await bcrypt.hash(password, 10);
    if (req.file) user.profilePic = req.file.path;

    const updatedUser = await user.save();
    res.status(200).json({ message: 'Profile updated', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
