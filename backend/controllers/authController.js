const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { 
      name, email, phone, password, role,
      agentType, territory, kycDocuments, bankDetails, paymentDetails,
      employeeId, accessLevel, assignedLocation, permissions, status, applicationStatus
    } = req.body;

    const userExists = await User.findOne({ $or: [{ email }, { phone }] });

    if (userExists) {
      const field = userExists.email === email ? 'Email' : 'Phone Number';
      return res.status(400).json({ message: `${field} is already registered` });
    }

    const userData = {
      name,
      email,
      phone,
      password,
      role: role || 'User',
      employeeId,
      accessLevel,
      assignedLocation,
      permissions,
      status: status || 'Inactive',
      applicationStatus: applicationStatus || 'Not Applied'
    };


    if (role === 'Agent') {
      userData.agentType = agentType;
      userData.territory = territory;
      userData.kycDocuments = kycDocuments;
      userData.bankDetails = bankDetails;
      userData.paymentDetails = paymentDetails;
      userData.applicationStatus = 'Pending Review';
      userData.status = 'Inactive';
    }

    const user = await User.create(userData);

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ message: 'Invalid user data provided' });
    }
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    // Handle Duplicate Key errors (e.g. Email/Phone)
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({ message: `The ${field} you entered is already in use` });
    }
    res.status(500).json({ message: error.message });
  }
};


// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { phone, password } = req.body;

  try {
    const user = await User.findOne({ phone });
    console.log('Login attempt for phone:', phone);
    if (user) {
      const isMatch = await user.comparePassword(password);
      console.log('User found. Password match:', isMatch);
      if (isMatch) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          token: generateToken(user._id)
        });
      } else {
        res.status(401).json({ message: 'Invalid phone number or password' });
      }
    } else {
      console.log('User not found for phone:', phone);
      res.status(401).json({ message: 'Invalid phone number or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      walletBalance: user.walletBalance,
      address: user.address,
      applicationStatus: user.applicationStatus,
      agentType: user.agentType,
      territory: user.territory,
      status: user.status
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// @desc    Get all subadmins
// @route   GET /api/auth/subadmins
// @access  Private/Admin
const getSubAdmins = async (req, res) => {
  try {
    const subadmins = await User.find({ role: 'Sub-Admin' }).select('-password');
    res.json(subadmins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, getUserProfile, getSubAdmins };

