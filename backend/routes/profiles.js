const express = require('express');
const router = express.Router();
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');
const {
  getProfile,
  saveResponses
} = require('../controllers/profiles');

router.use(ClerkExpressRequireAuth()); // Protect all routes

// Get user's profile + responses
router.get('/', getProfile);

// Save/update responses
router.post('/responses', saveResponses);

module.exports = router;