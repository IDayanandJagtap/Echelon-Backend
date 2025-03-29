const express = require('express');
const { updateStreak } = require('../controllers/streakController');

const router = express.Router();

// Route to update streak
router.post('/update-streak', updateStreak);

module.exports = router;