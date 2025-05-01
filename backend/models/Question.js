const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  // System Fields
  questionId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  category: {
    type: String,
    enum: ['health', 'lifestyle', 'psychology'],
    index: true
  },

  // Content Fields
  text: { 
    type: String, 
    required: true,
    maxlength: 250 
  },
  description: String,

  // Response Configuration
  responseType: {
    type: String,
    enum: ['text', 'number', 'boolean', 'multichoice', 'scale'],
    required: true
  },
  options: [String], // For multichoice questions
  min: Number,       // For scale/number
  max: Number,       // For scale/number

  // Metadata
  isActive: { 
    type: Boolean, 
    default: true 
  },
  version: { 
    type: Number, 
    default: 1 
  }
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);