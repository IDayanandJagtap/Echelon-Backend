const Task = require('../models/schema/task.model.js');

// Create a new task
const createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json({ success: true, task });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get the first 10 tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().limit(10);
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { createTask, getTasks };
