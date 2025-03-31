const Day = require("../models/schema/day.model.js");

const getDay = async (req, res) => {
  try {
    const { date, userId } = req.query;

    if (!date || !userId) {
      return res.status(400).json({ success: false, message: "date and userId are required" });
    }

    // Find the day and populate the tasks
    const day = await Day.findOne({ date: new Date(date), userId }).populate("tasks");

    if (!day) {
      return res.status(404).json({ success: false, message: "Day not found" });
    }

    res.status(200).json({ success: true, result: day });
  } catch (error) {
    console.error("Error fetching day details:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

// [PUT] /api/day
const updateDayStatus = async (req, res) => {
  try {
    const { date, userId } = req.query;
    const { statusOfDay } = req.body;

    if (!date || !userId || !statusOfDay) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const updatedDay = await Day.findOneAndUpdate(
      { date: new Date(date), userId },
      { $set: { statusOfDay } },
      { new: true }
    );

    if (!updatedDay) {
      return res.status(404).json({ success: false, message: "Day not found" });
    }

    res.status(200).json({ success: true, result: updatedDay });
  } catch (error) {
    console.error("Error updating day status:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

// [GET] /api/day/streak
const getStreak = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ success: false, message: "userId is required" });
    }

    const streak = await Day.aggregate([
      { $match: { userId, statusOfDay: "productive" } },
      { $group: { _id: "$userId", streak: { $sum: 1 } } },
    ]);

    res.status(200).json({ success: true, result: streak });
  } catch (error) {
    console.error("Error fetching streak:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

// [GET] /api/productivity/status/line-chart
const getLineChartProductivityStatus = async (req, res) => {
  try {
    const { startDate, endDate, userId } = req.query;

    if (!startDate || !endDate || !userId) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const data = await Day.find({
      userId,
      date: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });

    const result = data.map((day) => ({
      date: day.date,
      statusOfDay: day.statusOfDay,
    }));

    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error("Error fetching line chart data:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

// [GET] /api/productivity/status/pie-chart
const getPieChartProductivityStatus = async (req, res) => {
  try {
    const { startDate, endDate, userId, statusOfDay } = req.query;

    if (!startDate || !endDate || !userId || !statusOfDay) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Query the Day model for the specified date range, userId, and statusOfDay
    const data = await Day.find({
      userId,
      date: { $gte: new Date(startDate), $lte: new Date(endDate) },
      statusOfDay,
    });

    // Map the data to the desired format
    const result = data.map((day) => ({
      date: day.date.toISOString().split("T")[0], // Format date as YYYY-MM-DD
      day: new Date(day.date).toLocaleString("en-US", { weekday: "long" }), // Get the day of the week
      status: day.statusOfDay.charAt(0).toUpperCase() + day.statusOfDay.slice(1), // Capitalize the status
    }));

    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error("Error fetching pie chart data:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};


module.exports = {
  getDay,
  updateDayStatus,
  getStreak,
  getLineChartProductivityStatus,
  getPieChartProductivityStatus,
};