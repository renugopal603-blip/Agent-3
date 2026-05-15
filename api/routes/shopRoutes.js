const express = require('express');
const router = express.Router();
const { createShop, getShops, verifyShop, approveShop, deleteShop } = require('../controllers/shopController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getShops)
  .post(protect, createShop);

router.route('/:id')
  .delete(protect, deleteShop);

router.route('/:id/verify')
  .put(protect, verifyShop);

router.route('/:id/approve')
  .put(protect, approveShop);

module.exports = router;
