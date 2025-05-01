const express = require('express');
const router = express.Router();
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node'); // Clerk's auth middleware
const { getMoodEntries, createMoodEntry } = require('../controllers/moods');

// Protect all routes with Clerk authentication
router.use(ClerkExpressRequireAuth());

// Get all mood entries for authenticated user
router.get('/', getMoodEntries);

// Create new mood entry
router.post('/', createMoodEntry);

module.exports = router;