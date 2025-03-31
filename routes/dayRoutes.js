const express = require("express");
const router = express.Router();
const {
  getDay,
  updateDayStatus,
  getStreak,
  getLineChartProductivityStatus,
  getPieChartProductivityStatus,
} = require("../controllers/dayController");

// [GET] /api/day
router.get("/", getDay); // Fetch day details

// [PUT] /api/day -> to update statusOfDay [We can update streak here]
router.put("/", updateDayStatus); // Update the status of the day

// [GET] /api/day/streak
router.get("/streak", getStreak); // Fetch the streak details

// [GET] /api/productivity/status/line-chart?startDate=""&endDate=""&userId=""
router.get("/productivity/status/line-chart", getLineChartProductivityStatus); // Fetch line chart data for productivity

// [GET] /api/productivity/status/pie-chart?startDate=""&endDate=""&statusOfDay=""&userId=""
router.get("/productivity/status/pie-chart", getPieChartProductivityStatus); // Fetch pie chart data for productivity

module.exports = router;