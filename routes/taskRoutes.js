const express = require('express');
const router = express.Router();
const { createTask, getTask, updateTask, getDay } = require('../controllers/taskController');

router.post('/', createTask); // Create task
router.get('/task', getTask); // Get task by date
router.put('/task', updateTask); // Update task by date
router.get('/day', getDay); // Get tasks for a day

module.exports = router;
