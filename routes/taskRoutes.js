const express = require("express"); 
const router = express.Router();
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

// [GET] /api/tasks?date=""&day=""&statusOfDay=""&userId=""
router.get("/", getTasks); // Fetch tasks based on query parameters

// [POST] /api/tasks/create -> body (userId, taskDetails)
router.post("/create", createTask); // Create a new task

// [PUT] /api/tasks/update
router.put("/update", updateTask); // Update an existing task

router.delete("/delete", deleteTask);

module.exports = router;