const express = require("express");
const { createOrUpdateDay } = require("../controllers/dayController.js");

const router = express.Router();

router.post("/day", createOrUpdateDay); // Route to create or update a day

module.exports = router;