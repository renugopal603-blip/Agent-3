const express = require('express');
const router = express.Router();
const { getShops, verifyShop, deleteShop } = require('../controllers/shopController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getShops);

router.route('/:id')
  .delete(protect, deleteShop);

router.route('/:id/verify')
  .put(protect, verifyShop);

module.exports = router;
