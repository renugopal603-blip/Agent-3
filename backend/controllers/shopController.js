const Shop = require('../models/Shop');

// @desc    Create a new shop registration
// @route   POST /api/shops
// @access  Private/Agent
const createShop = async (req, res) => {
  try {
    const { name, category, owner, location, agent, documents } = req.body;
    const shop = new Shop({
      name,
      category,
      owner,
      location,
      agent: agent || req.user.name,
      documents
    });
    const createdShop = await shop.save();
    res.status(201).json(createdShop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all shops (filtered by role if needed)
// @route   GET /api/shops
// @access  Private
const getShops = async (req, res) => {
  try {
    // For now, return all shops. In production, we'd filter by agent if req.user.role is Agent
    const shops = await Shop.find().sort({ createdAt: -1 });
    res.json(shops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify a shop (Sub-Admin)
// @route   PUT /api/shops/:id/verify
// @access  Private/Sub-Admin
const verifyShop = async (req, res) => {
  try {
    const { status } = req.body; 
    const shop = await Shop.findById(req.params.id);

    if (shop) {
      shop.status = status || 'Verified by Sub Admin';
      const updatedShop = await shop.save();
      res.json(updatedShop);
    } else {
      res.status(404).json({ message: 'Shop not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Approve a shop (Admin)
// @route   PUT /api/shops/:id/approve
// @access  Private/Admin
const approveShop = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);

    if (shop) {
      shop.status = 'Active';
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
// @access  Private
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

module.exports = { createShop, getShops, verifyShop, approveShop, deleteShop };
