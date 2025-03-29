const express = require("express");
const router = express.Router();
const {
  createTask,
  getTaskByDateAndUserId,
  updateTask,
  getDay,
  getProductivityStatusByRange,
} = require("../controllers/taskController");

router.post("/", createTask);
router.get("/task", getTaskByDateAndUserId);
router.put("/update-task", updateTask);
router.get("/day", getDay);
router.get("/status/productivity/by-range", getProductivityStatusByRange);

module.exports = router;

