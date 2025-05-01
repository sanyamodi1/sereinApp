const express = require('express');
const router = express.Router();
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node'); // Clerk's auth middleware
const { getMoodEntries, createMoodEntry } = require('../controllers/moods');
const {
  getAllHabits,
  createHabit,
  updateHabit,
  deleteHabit
} = require('../controllers/habits');


// router.use(auth);
router.use(ClerkExpressRequireAuth());

router.get('/', getAllHabits);
router.post('/', createHabit);
router.put('/:id', updateHabit);
router.delete('/:id', deleteHabit);

module.exports = router;