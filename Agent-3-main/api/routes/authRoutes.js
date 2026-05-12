const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, getSubAdmins } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.get('/subadmins', protect, getSubAdmins);


module.exports = router;
