const express = require("express");
const router = express.Router();
const { getRandomQuote } = require("../controllers/quoteController");

// [GET] /api/quote
router.get("/", getRandomQuote); // Fetch a random quote

module.exports = router;