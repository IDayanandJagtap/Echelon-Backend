const Day = require("../models/schema/day.model.js");

const markProductivity = async (req, res) => {
  try {
    const { userId, date, statusOfDay, comment } = req.body;

    if (!userId || !date || !statusOfDay) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    let dayEntry = await Day.findOne({ date });

    if (dayEntry) {
      // Update existing entry
      dayEntry.statusOfDay = statusOfDay;
      dayEntry.comment = comment;
      dayEntry.updatedBy = userId;
      await dayEntry.save();
    } else {
      // Create new entry
      dayEntry = new Day({
        date,
        statusOfDay,
        comment,
        createdBy: userId,
        updatedBy: userId,
      });
      await dayEntry.save();
    }

    res.status(201).json({ success: true, message: "Productivity status marked successfully", data: dayEntry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { markProductivity };
