const Task = require("../models/schema/task.model.js");
const Day = require("../models/schema/day.model.js");

// [GET] /api/tasks
const getTasks = async (req, res) => {
  try {
    const { date, day, statusOfDay, userId } = req.query;

    const query = {};
    if (date) query.taskDate = new Date(date);
    if (userId) query.userId = userId;

    // If statusOfDay is provided, fetch it from the Day model
    if (statusOfDay) {
      const dayRecord = await Day.findOne({ date: new Date(date), userId });
      if (!dayRecord || dayRecord.statusOfDay !== statusOfDay) {
        return res.status(200).json({ success: true, result: [] }); // No tasks if statusOfDay doesn't match
      }
    }

    // Fetch tasks based on the query
    const tasks = await Task.find(query);
    res.status(200).json({ success: true, result: tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

// [POST] /api/tasks/create
const createTask = async (req, res) => {
  try {
    const { userId, title, description, status, category, taskDate } = req.body;

    if (!userId || !title || !description || !taskDate) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Create the task
    const task = new Task({ userId, title, description, status, category, taskDate });
    await task.save();

    // Add the task to the corresponding day
    const day = await Day.findOneAndUpdate(
      { date: new Date(taskDate), userId },
      { $addToSet: { tasks: task._id } }, // Add the task ID to the tasks array
      { new: true, upsert: true } // Create the day if it doesn't exist
    );

    res.status(201).json({ success: true, task, day });
  } catch (error) {
    console.error("Error creating task:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

// [PUT] /api/tasks/update
const updateTask = async (req, res) => {
  try {
    const { userId, taskDate } = req.query;
    const updateData = req.body;

    if (!userId || !taskDate) {
      return res.status(400).json({ success: false, message: "userId and taskDate are required" });
    }

    const updatedTask = await Task.findOneAndUpdate(
      { userId, taskDate: new Date(taskDate) },
      { $set: updateData },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, result: updatedTask });
  } catch (error) {
    console.error("Error updating task:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { getTasks, createTask, updateTask };