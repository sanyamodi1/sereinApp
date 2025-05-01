const MoodEntry = require('../models/Mood');

// Get the last 30 mood entries for authenticated user
exports.getMoodEntries = async (req, res) => {
  try {
    const userId = req.auth.userId; // Clerk provides userId in req.auth
    
    if (!userId) {
      return res.status(403).json({ error: 'Unauthorized - No user ID found' });
    }

    const moods = await MoodEntry.find({ userId })
      .sort({ date: -1 })
      .limit(30);
    
    res.json(moods);
  } catch (err) {
    res.status(500).json({ 
      error: 'Failed to fetch mood entries',
      details: err.message 
    });
  }
};

// Create a new mood entry
exports.createMoodEntry = async (req, res) => {
  try {
    const userId = req.auth.userId;
    
    if (!userId) {
      return res.status(403).json({ error: 'Unauthorized - No user ID found' });
    }

    // Validate required fields
    if (!req.body.mood) {
      return res.status(400).json({ error: 'Mood is required' });
    }

    const moodEntry = new MoodEntry({
      mood: req.body.mood,
      userId, // Using Clerk's userId
      notes: req.body.notes || '', // Default empty string if notes not provided
      date: req.body.date || new Date() // Use provided date or current date
    });

    await moodEntry.save();
    res.status(201).json(moodEntry);
  } catch (err) {
    res.status(400).json({ 
      error: 'Failed to create mood entry',
      details: err.message 
    });
  }
};