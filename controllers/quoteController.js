const fs = require('fs');
const path = require('path');

// Load quotes from the JSON file during server startup
const quotesPath = path.join(__dirname, '..', 'static', 'quotes.json');
let quotes = {};

try {
    const data = fs.readFileSync(quotesPath, 'utf8'); // Use synchronous file reading during startup
    quotes = JSON.parse(data);
} catch (err) {
    console.error('Error reading or parsing quotes.json:', err.message);
    quotes = {}; // Ensure quotes is an empty object if there's an error
}

// Function to get a random quote
const getRandomQuote = (req, res) => {
    const quoteKeys = Object.keys(quotes);
    if (quoteKeys.length === 0) {
        return res.status(500).json({ error: 'No quotes available' });
    }
    const randomKey = quoteKeys[Math.floor(Math.random() * quoteKeys.length)];
    const randomQuote = quotes[randomKey];
    res.json({ quote: randomQuote });
};

module.exports = { getRandomQuote };