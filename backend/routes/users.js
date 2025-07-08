const express = require('express');
const User = require('../models/User');
const { authMiddleware, requireRole, requireAnyRole } = require('../middleware/auth');
const router = express.Router();
const QRCode = require('qrcode');

// Get all users (leaderboard)
router.get('/', authMiddleware, requireAnyRole(['super', 'secondary']), async (req, res) => {
  try {
    const users = await User.find().sort({ dutyTime: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get single user by ID
router.get('/:id', authMiddleware, requireAnyRole(['super', 'secondary']), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update duty time (admin only)
router.put('/:id/duty', authMiddleware, requireAnyRole(['super', 'secondary']), async (req, res) => {
  try {
    const { dutyTime } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $inc: { dutyTime: dutyTime || 0 } },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Edit user (admin only)
router.put('/:id', authMiddleware, requireAnyRole(['super', 'secondary']), async (req, res) => {
  try {
    const { name, email, phoneNumber } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, phoneNumber },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete user (super admin only)
router.delete('/:id', authMiddleware, requireRole('super'), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Generate QR code for user (admin only)
router.get('/:id/qrcode', authMiddleware, requireAnyRole(['super', 'secondary']), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const qrData = `ID:${user._id},Name:${user.name}`;
    const qrCodeUrl = await QRCode.toDataURL(qrData);
    res.json({ qrCodeUrl });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router; 