const express = require("express");
const {
  getDay,
  updateDayStatus,
  getStreak,
  getLineChartProductivityStatus,
  getPieChartProductivityStatus,
} = require("../controllers/dayController");

const router = express.Router();

// Define routes
router.get("/", getDay); // GET /api/day
router.put("/", updateDayStatus); // PUT /api/day
router.get("/streak", getStreak); // GET /api/day/streak
router.get("/productivity/status/line-chart", getLineChartProductivityStatus); // GET /api/productivity/status/line-chart
router.get("/productivity/status/pie-chart", getPieChartProductivityStatus); // GET /api/productivity/status/pie-chart

module.exports = router;