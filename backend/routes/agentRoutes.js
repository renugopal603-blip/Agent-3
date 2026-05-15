const express = require('express');
const router = express.Router();
const { getAgents, addAgent, deleteAgent, verifyAgent, approveAgent } = require('../controllers/agentController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getAgents)
  .post(protect, addAgent);

router.route('/:id')
  .delete(protect, deleteAgent);

router.put('/:id/verify', protect, verifyAgent);
router.put('/:id/approve', protect, approveAgent);

module.exports = router;
