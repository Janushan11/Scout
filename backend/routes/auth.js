const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');
const { authMiddleware, requireRole } = require('../middleware/auth');
const router = express.Router();
const sendEmail = require('../utils/sendEmail');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// User Registration
router.post('/register', async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;
    if (!name || !email || !phoneNumber || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const existingUser = await User.findOne({ $or: [{ email }, { phoneNumber }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, phoneNumber, password: hashedPassword });
    await user.save();
    // Send registration email
    try {
      await sendEmail({
        to: email,
        subject: 'Welcome to Scout',
        text: `Hello ${name},\n\nYour registration was successful!`,
      });
    } catch (e) { console.error('Email error:', e.message); }
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// User Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Admin Registration (Super Admin only, for demo)
router.post('/admin/register', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ email, password: hashedPassword, role });
    await admin.save();
    // Send registration email
    try {
      await sendEmail({
        to: email,
        subject: 'Scout Admin Registration',
        text: `Hello,\n\nYou have been registered as a ${role} admin.`,
      });
    } catch (e) { console.error('Email error:', e.message); }
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Admin Login
router.post('/admin/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const admin = await Admin.findOne({ email, role });
    if (!admin) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: admin._id, role: admin.role }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, admin: { id: admin._id, email: admin.email, role: admin.role } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all admins (super only)
router.get('/admin', authMiddleware, requireRole('super'), async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get single admin (super only)
router.get('/admin/:id', authMiddleware, requireRole('super'), async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).json({ message: 'Admin not found' });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Edit admin (super only)
router.put('/admin/:id', authMiddleware, requireRole('super'), async (req, res) => {
  try {
    const { email, role } = req.body;
    const admin = await Admin.findByIdAndUpdate(
      req.params.id,
      { email, role },
      { new: true }
    );
    if (!admin) return res.status(404).json({ message: 'Admin not found' });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete admin (super only)
router.delete('/admin/:id', authMiddleware, requireRole('super'), async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) return res.status(404).json({ message: 'Admin not found' });
    res.json({ message: 'Admin deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Password reset for user or admin (by email)
router.post('/reset-password', async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      return res.status(400).json({ message: 'Email and new password are required' });
    }
    let user = await User.findOne({ email });
    if (user) {
      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();
      // Send password reset email
      try {
        await sendEmail({
          to: email,
          subject: 'Scout Password Reset',
          text: `Hello,\n\nYour password has been reset successfully.`,
        });
      } catch (e) { console.error('Email error:', e.message); }
      return res.json({ message: 'User password reset successfully' });
    }
    let admin = await Admin.findOne({ email });
    if (admin) {
      admin.password = await bcrypt.hash(newPassword, 10);
      await admin.save();
      // Send password reset email
      try {
        await sendEmail({
          to: email,
          subject: 'Scout Admin Password Reset',
          text: `Hello,\n\nYour admin password has been reset successfully.`,
        });
      } catch (e) { console.error('Email error:', e.message); }
      return res.json({ message: 'Admin password reset successfully' });
    }
    res.status(404).json({ message: 'No user or admin found with that email' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router; 