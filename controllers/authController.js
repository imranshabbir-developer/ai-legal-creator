import bcrypt from 'bcryptjs';
import User from '../models/UserModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Register a new user
export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role: role || 'client',
      profilePic: req.file?.path || null,
    });

    const token = generateToken(user._id, user.role);
    res.status(201).json({ user, token });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc    Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    const token = generateToken(user._id, user.role);
    res.status(200).json({ user, token });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
