const fs = require('fs');
const path = require('path');

// Load quotes from the JSON file
const quotesPath = path.join(__dirname, '..', 'static', 'quotes.json');
let quotes = {};

fs.readFile(quotesPath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading quotes.json:', err);
        return;
    }
    quotes = JSON.parse(data);
});

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