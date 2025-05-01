const mongoose = require('mongoose');

const moodEntrySchema = new mongoose.Schema({
  mood: { 
    type: String, 
    required: true,
    enum: ['happy', 'sad', 'angry', 'anxious', 'neutral', 'excited', 'tired'] // Example values
  },
  intensity: {
    type: Number,
    min: 1,
    max: 5,
    default: 3
  },
  date: { 
    type: Date, 
    default: Date.now,
    index: true // For faster date-based queries
  },
  userId: { 
    type: String,  // Changed from ObjectId to String for Clerk compatibility
    required: true,
    index: true // Improves query performance
  },
  notes: {
    type: String,
    maxlength: 500 // Prevent very long notes
  },
  tags: [String] // Optional mood tags (e.g., ['work', 'family'])
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Index for frequently queried fields
moodEntrySchema.index({ userId: 1, date: -1 });

module.exports = mongoose.model('MoodEntry', moodEntrySchema);