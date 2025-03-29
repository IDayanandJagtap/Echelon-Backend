const Day = require("../models/schema/day.model.js");

const createOrUpdateDay = async (req, res) => {
  try {
    const { date, userId, statusOfDay } = req.body;

    if (!date || !userId || !statusOfDay) {
      return res.status(400).json({
        success: false,
        message: "date, userId, and statusOfDay are required",
      });
    }

    const parsedDate = new Date(date);

    // Check if the day already exists
    const existingDay = await Day.findOne({ date: parsedDate, userId });

    if (existingDay) {
      // Update the existing day
      existingDay.statusOfDay = statusOfDay;
      await existingDay.save();
      return res.status(200).json({ success: true, result: existingDay });
    }

    // Create a new day
    const newDay = new Day({ date: parsedDate, userId, statusOfDay });
    await newDay.save();
    res.status(201).json({ success: true, result: newDay });
  } catch (error) {
    console.error("Error creating/updating day:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { createOrUpdateDay };