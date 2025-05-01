const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  title: { type: String, required: true },
  dailyProgress: { type: Number, default: 0 },
  totalTarget: { type: Number, required: true },
  measurement: { type: String, required: true },
  description: String,
  frequency: { 
    type: String, 
    enum: ['daily', 'weekly', 'monthly'], 
    default: 'daily' 
  },
  streak: { type: Number, default: 0 },
  completedDays: { type: Number, default: 0 },
  totalDays: { type: Number, default: 0 },
  icon: String,
  color: String,
  userId: { 
    type: String,  // Changed from ObjectId to String
    required: true 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Habit', habitSchema);