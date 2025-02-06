const Task = require('../models/schema/task.model.js');

// Create a new task
const createTask = async (req, res) => {
  try {
    const taskData = {
      ...req.body,
      userId: req.body.userId || '12345', // Use dynamic or fallback dummy userId
      taskDate: req.body.taskDate, // Ensure taskDate is in 'YYYY-MM-DD' format
    };
    const task = new Task(taskData);
    await task.save();
    res.status(201).json({ success: true, task });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get tasks by userId and taskDate
const getTaskByDateAndUserId = async (req, res) => {
  try {
    const { date, userId } = req.query;

    if (!date || !userId) {
      return res.status(400).json({ success: false, message: 'Date and userId are required' });
    }

    const task = await Task.findOne({ taskDate: date, userId });

    if (!task) {
      return res.status(404).json({ success: false, task: null, message: 'No task found' });
    }

    res.status(200).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update task by date
const updateTask = async (req, res) => {
  try {
    const { date, userId } = req.query;

    if (!date || !userId) {
      return res.status(400).json({ success: false, message: 'Date and userId are required' });
    }

    const updatedTask = await Task.findOneAndUpdate(
      { taskDate: date, userId },
      req.body,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ success: false, message: 'No task found to update' });
    }

    res.status(200).json({ success: true, task: updatedTask });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all tasks for a specific day
const getDay = async (req, res) => {
  try {
    const { date, userId } = req.query;

    if (!date || !userId) {
      return res.status(400).json({ success: false, message: 'Date and userId are required' });
    }

    const tasks = await Task.find({ taskDate: date, userId });

    if (!tasks.length) {
      return res.status(404).json({ success: false, tasks: [], message: 'No tasks found' });
    }

    res.status(200).json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { createTask, getTaskByDateAndUserId, updateTask, getDay };
