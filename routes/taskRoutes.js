const express = require('express');
const router = express.Router();
const { createTask, getTaskByDateAndUserId, updateTask, getDay } = require('../controllers/taskController');

router.post('/', createTask); // Create task
router.get('/task', getTaskByDateAndUserId); // Get task by date
router.put('/update-task', updateTask); // Update task by date
router.get('/day', getDay); // Get tasks for a day

module.exports = router;
