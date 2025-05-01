const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  questionId: { 
    type: String, 
    required: true,
    index: true 
  },
  answer: {
    type: mongoose.Schema.Types.Mixed,
    validate: {
      validator: function(value) {
        // Dynamic validation based on question type
        const question = this.parent().getQuestion(this.questionId);
        if (!question) return true; // Skip if question not loaded
        
        switch (question.responseType) {
          case 'boolean':
            return typeof value === 'boolean';
          case 'number':
            return typeof value === 'number' && 
                  (!question.min || value >= question.min) &&
                  (!question.max || value <= question.max);
          case 'multichoice':
            return Array.isArray(value) && 
                  value.every(v => question.options.includes(v));
          default:
            return true;
        }
      },
      message: 'Invalid answer format for question'
    }
  },
  respondedAt: { 
    type: Date, 
    default: Date.now 
  }
});

const userProfileSchema = new mongoose.Schema({
  clerkUserId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  responses: [responseSchema],
  completedCategories: [String],
  
  // Virtual population
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }]
}, { 
  timestamps: true,
  toJSON: { virtuals: true } 
});

// Virtual for easier question access
userProfileSchema.virtual('questionMap').get(function() {
  return (this.questions || []).reduce((map, q) => {
    map[q.questionId] = q;
    return map;
  }, {});
});

// Helper method
userProfileSchema.methods.getQuestion = function(questionId) {
  return this.questionMap?.[questionId];
};

module.exports = mongoose.model('UserProfile', userProfileSchema);