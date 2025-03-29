const express = require("express");
const router = express.Router();
const { markProductivity } = require("../controllers/dayController");

router.post("/mark", markProductivity);  // Ensure this is correct

module.exports = router;
