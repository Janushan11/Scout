const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'super', 'secondary'], default: 'user' },
  registrationTime: { type: Date, default: Date.now },
  dutyTime: { type: Number, default: 0 },
  qrCode: { type: String }
});

module.exports = mongoose.model('User', UserSchema); 