const Task = require("../models/schema/task.model.js");

// Helper function to parse date (ensures UTC start of the day)
const parseDate = (dateStr) => {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
};

// Helper function to format date as "DD-MM-YYYY"
const formatDate = (date) => {
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${day}-${month}-${year}`;
};

// Get productivity status by date range
const getProductivityStatusByRange = async (req, res) => {
  try {
    const { startDate, endDate, userId } = req.query;
    console.log("Received Query Params:", { startDate, endDate, userId });

    if (!startDate || !endDate || !userId) {
      return res
        .status(400)
        .json({
          success: false,
          message: "startDate, endDate, and userId are required",
        });
    }

    const start = parseDate(startDate);
    const end = parseDate(endDate);
    const today = new Date();
    today.setUTCHours(23, 59, 59, 999);
    console.log("Parsed Dates:", { start, end, today });

    // Fetch tasks within the date range for the user
    const tasks = await Task.find({
      taskDate: { $gte: start, $lte: end },
      userId,
    });
    console.log("Fetched Tasks:", tasks);

    // Map dates to status
    const taskStatusMap = new Map();
    tasks.forEach((task) =>
      taskStatusMap.set(formatDate(task.taskDate), task.status)
    );

    let dateCursor = new Date(start);
    const result = [];

    while (dateCursor <= end) {
      const dateStr = formatDate(dateCursor);
      const dayName = dateCursor.toLocaleDateString("en-US", {
        weekday: "long",
      });

      const status =
        dateCursor > today
          ? null
          : taskStatusMap.get(dateStr) || "Not Productive";
      result.push({ date: dateStr, day: dayName, status });

      dateCursor.setUTCDate(dateCursor.getUTCDate() + 1);
    }

    console.log("Final Response:", result);
    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error("API Error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create a new task
const createTask = async (req, res) => {
  try {
    const { userId, taskDate } = req.body;
    console.log("Received Body:", req.body);
    if (!userId || !taskDate) {
      return res
        .status(400)
        .json({ success: false, message: "userId and taskDate are required" });
    }

    const taskData = { ...req.body, taskDate: parseDate(taskDate) };
    console.log("Processed Task Data:", taskData);
    const task = new Task(taskData);
    await task.save();
    console.log("Task Saved:", task);
    res.status(201).json({ success: true, result: task });
  } catch (error) {
    console.error("Task Creation Error:", error.message);
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get tasks by userId and taskDate
const getTaskByDateAndUserId = async (req, res) => {
  try {
    const { date, userId } = req.query;
    console.log("Received Query Params:", { date, userId });
    if (!date || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Date and userId are required" });
    }

    const task = await Task.findOne({ taskDate: parseDate(date), userId });
    console.log("Fetched Task:", task);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, task: null, message: "No task found" });
    }

    res.status(200).json({ success: true, result: task });
  } catch (error) {
    console.error("Task Fetch Error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update task by date
const updateTask = async (req, res) => {
  try {
    const { date, userId } = req.query;
    console.log("Received Query Params for Update:", {
      date,
      userId,
      updateData: req.body,
    });
    if (!date || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Date and userId are required" });
    }

    const updatedTask = await Task.findOneAndUpdate(
      { taskDate: parseDate(date), userId },
      { $set: req.body },
      { new: true }
    );
    console.log("Updated Task:", updatedTask);
    if (!updatedTask) {
      return res
        .status(404)
        .json({ success: false, message: "No task found to update" });
    }

    res.status(200).json({ success: true, result: updatedTask });
  } catch (error) {
    console.error("Task Update Error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all tasks for a specific day
const getDay = async (req, res) => {
  try {
    const { date, userId } = req.query;
    console.log("Received Query Params for GetDay:", { date, userId });
    if (!date || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Date and userId are required" });
    }

    const tasks = await Task.find({ taskDate: parseDate(date), userId });
    console.log("Fetched Tasks for Day:", tasks);
    res.status(200).json({ success: true, result: tasks });
  } catch (error) {
    console.error("Get Day Error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getProductivityStatusByRange,
  createTask,
  getTaskByDateAndUserId,
  updateTask,
  getDay,
};
