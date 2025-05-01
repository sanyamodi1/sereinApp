const Habit = require('../models/Habit');

// Get all habits for the authenticated user
exports.getAllHabits = async (req, res) => {
  try {
    const userId = req.auth.userId; // Clerk provides userId in req.auth
    
    if (!userId) {
      return res.status(403).json({ error: 'Unauthorized - No user ID found' });
    }

    const habits = await Habit.find({ userId });
    res.json(habits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new habit for the authenticated user
exports.createHabit = async (req, res) => {
    console.log("Request Body:", req.body); // Log the incoming data
  
    const userId = req.auth?.userId || req.body.userId;
    
    if (!userId) {
      return res.status(403).json({ error: 'Unauthorized - No user ID found' });
    }
  
    try {
      const habit = new Habit({
        ...req.body,
        userId
      });
  
      await habit.save();
      res.status(201).json(habit);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  

// Update a habit (only if it belongs to the authenticated user)
exports.updateHabit = async (req, res) => {
  try {
    const userId = req.auth.userId;
    
    if (!userId) {
      return res.status(403).json({ error: 'Unauthorized - No user ID found' });
    }

    const habit = await Habit.findOneAndUpdate(
      { _id: req.params.id, userId }, // Ensure the habit belongs to this user
      req.body,
      { new: true }
    );
    
    if (!habit) {
      return res.status(404).json({ error: 'Habit not found or not owned by user' });
    }
    
    res.json(habit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a habit (only if it belongs to the authenticated user)
exports.deleteHabit = async (req, res) => {
  try {
    const userId = req.auth.userId;
    
    if (!userId) {
      return res.status(403).json({ error: 'Unauthorized - No user ID found' });
    }

    const habit = await Habit.findOneAndDelete({
      _id: req.params.id,
      userId // Ensure the habit belongs to this user
    });
    
    if (!habit) {
      return res.status(404).json({ error: 'Habit not found or not owned by user' });
    }
    
    res.json({ message: 'Habit deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};