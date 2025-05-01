require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authMiddleware = require('./middlewares/auth'); // Import auth middleware
const app = express();

// Connect to MongoDB
const db = require('./config/db');
db.connect();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const habitRoutes = require('./routes/habits');
const moodRoutes = require('./routes/moods');

// Apply authentication middleware to routes that need it
app.use('/api/habits', authMiddleware, habitRoutes);
app.use('/api/moods', authMiddleware, moodRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: err.message, 
    stack: err.stack 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
