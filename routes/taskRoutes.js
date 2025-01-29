const express = require('express');
const router = express.Router();
const { createTask, getTasks } = require('../controllers/taskController');

// Create a task
router.post('/', createTask);

// Get the first 10 tasks
router.get('/', getTasks);

module.exports = router;
