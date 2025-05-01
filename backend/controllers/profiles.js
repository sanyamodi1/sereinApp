const Question = require('../models/Question');
const UserProfile = require('../models/UserProfile');

// Preload questions into profile
exports.getProfile = async (req, res) => {
  try {
    const [profile, questions] = await Promise.all([
      UserProfile.findOne({ clerkUserId: req.auth.userId }),
      Question.find({ isActive: true })
    ]);

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    // Attach questions for client-side validation
    const response = profile.toJSON();
    response.questions = questions;
    
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Save responses with validation
exports.saveResponses = async (req, res) => {
  try {
    // 1. Validate all questions exist
    const questionIds = req.body.responses.map(r => r.questionId);
    const validQuestions = await Question.find({ 
      questionId: { $in: questionIds },
      isActive: true 
    });

    if (validQuestions.length !== questionIds.length) {
      return res.status(400).json({ error: 'Invalid question IDs detected' });
    }

    // 2. Update profile
    const updated = await UserProfile.findOneAndUpdate(
      { clerkUserId: req.auth.userId },
      { 
        $set: { 
          responses: req.body.responses,
          questions: validQuestions.map(q => q._id) // Cache questions
        },
        $addToSet: { 
          completedCategories: { $each: req.body.completedCategories || [] } 
        }
      },
      { new: true, runValidators: true }
    ).populate('questions');

    res.json(updated);
  } catch (err) {
    res.status(400).json({ 
      error: 'Validation failed',
      details: err.errors 
    });
  }
};