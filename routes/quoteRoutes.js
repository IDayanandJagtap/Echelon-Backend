const express = require('express');
const { getRandomQuote } = require('../controllers/quoteController');

const router = express.Router();

// Define the route for getting a random quote
router.get('/random-quote', getRandomQuote);

module.exports = router;