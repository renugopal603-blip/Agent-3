const express = require('express');
const router = express.Router();
const { getAgents, addAgent, deleteAgent } = require('../controllers/agentController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getAgents)
  .post(protect, addAgent);

router.route('/:id')
  .delete(protect, deleteAgent);

module.exports = router;
