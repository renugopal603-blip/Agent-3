const Shop = require('../models/Shop');

// @desc    Get all shops for verification
// @route   GET /api/shops
// @access  Private/Sub-Admin
const getShops = async (req, res) => {
  try {
    const shops = await Shop.find().populate('ownerId', 'name phone');
    res.json(shops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify or Reject a shop
// @route   PUT /api/shops/:id/verify
// @access  Private/Sub-Admin
const verifyShop = async (req, res) => {
  try {
    const { status } = req.body; // 'Verified' or 'Rejected'
    const shop = await Shop.findById(req.params.id);

    if (shop) {
      shop.kycStatus = status;
      const updatedShop = await shop.save();
      res.json(updatedShop);
    } else {
      res.status(404).json({ message: 'Shop not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a shop request
// @route   DELETE /api/shops/:id
// @access  Private/Sub-Admin
const deleteShop = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (shop) {
      await shop.deleteOne();
      res.json({ message: 'Shop request removed' });
    } else {
      res.status(404).json({ message: 'Shop not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getShops, verifyShop, deleteShop };
