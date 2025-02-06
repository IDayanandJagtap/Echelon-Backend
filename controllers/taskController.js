const Task = require('../models/schema/task.model.js');

// Dummy userId for testing
const dummyUserId = '12345';

// Create a new task
const createTask = async (req, res) => {
  try {
    const taskData = {
      ...req.body,
      userId: dummyUserId, // Set the dummy userId
    };
    const task = new Task(taskData);
    await task.save();
    res.status(201).json({ success: true, task });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get tasks by userId and taskDate
const getTask = async (req, res) => {
  try {
    const { date } = req.query;
    const task = await Task.findOne({ taskDate: new Date(date), userId: dummyUserId });
    res.status(200).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update task by date
const updateTask = async (req, res) => {
  try {
    const { date } = req.query;
    const updatedTask = await Task.findOneAndUpdate(
      { taskDate: new Date(date), userId: dummyUserId },
      req.body,
      { new: true }
    );
    res.status(200).json({ success: true, task: updatedTask });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all tasks for a specific day
const getDay = async (req, res) => {
  try {
    const { date } = req.query;
    const tasks = await Task.find({ taskDate: new Date(date), userId: dummyUserId });
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { createTask, getTask, updateTask, getDay };
