const User = require('../models/User');

// @desc    Get all agents assigned to sub-admin (or all agents if admin)
// @route   GET /api/agents
// @access  Private/Sub-Admin
const getAgents = async (req, res) => {
  try {
    // For now, listing all agents. Later we can filter by territory if sub-admin
    const agents = await User.find({ role: { $in: ['Agent', 'District Agent', 'Divisional Agent', 'Pincode Agent'] } });
    res.json(agents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Register a new agent (Sub-Admin onboarding)
// @route   POST /api/agents
// @access  Private/Sub-Admin
const addAgent = async (req, res) => {
  try {
    const { name, email, phone, role, territory } = req.body;

    const userExists = await User.findOne({ $or: [{ email }, { phone }] });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const agent = await User.create({
      name,
      email,
      phone,
      password: 'TemporaryPassword123!', // Should be changed on first login
      role: role || 'Agent',
      territory: { pincode: territory }, // Simplification for territory
      applicationStatus: 'Approved',
      status: 'Active'
    });

    res.status(201).json(agent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete an agent
// @route   DELETE /api/agents/:id
// @access  Private/Sub-Admin
const deleteAgent = async (req, res) => {
  try {
    const agent = await User.findById(req.params.id);
    if (agent) {
      await agent.deleteOne();
      res.json({ message: 'Agent removed' });
    } else {
      res.status(404).json({ message: 'Agent not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update agent status (Sub-Admin verification)
// @route   PUT /api/agents/:id/verify
// @access  Private/Sub-Admin
const verifyAgent = async (req, res) => {
  try {
    const agent = await User.findById(req.params.id);
    if (!agent) return res.status(404).json({ message: 'Agent not found' });

    agent.applicationStatus = 'Verified';
    agent.status = 'Under Review';
    agent.auditLogs.push({
      action: 'Verified by Sub-Admin',
      performedBy: req.user._id,
      details: `KYC and application verified. Forwarded to Admin.`
    });
    
    agent.notifications.push({
      title: 'Application Verified',
      message: 'Your application has been verified by the Sub-Admin and forwarded to the Admin for final approval.',
      type: 'success'
    });

    await agent.save();
    res.json(agent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Final agent approval (Admin)
// @route   PUT /api/agents/:id/approve
// @access  Private/Admin
const approveAgent = async (req, res) => {
  try {
    const agent = await User.findById(req.params.id);
    if (!agent) return res.status(404).json({ message: 'Agent not found' });

    const { action, reason } = req.body; // action: 'Approved', 'Rejected', 'Hold'
    
    agent.applicationStatus = action;
    if (action === 'Approved') {
      agent.status = 'Active';
    } else if (action === 'Rejected') {
      agent.status = 'Rejected';
    }

    agent.auditLogs.push({
      action: `Final Decision: ${action}`,
      performedBy: req.user._id,
      details: reason || `Agent application ${action.toLowerCase()}.`
    });

    agent.notifications.push({
      title: `Application ${action}`,
      message: reason || `Your agent account is now ${action.toLowerCase()}.`,
      type: action === 'Approved' ? 'success' : 'warning'
    });

    await agent.save();
    res.json(agent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAgents, addAgent, deleteAgent, verifyAgent, approveAgent };
