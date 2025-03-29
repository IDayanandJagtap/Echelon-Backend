const Day = require('../models/schema/day.model'); // Import the Day model

// Function to update streak based on the provided day
const updateStreak = async (req, res) => {
    const { date, statusOfDay } = req.body; // Expecting 'date' (YYYY-MM-DD) and 'statusOfDay' from the frontend

    if (!date || !statusOfDay) {
        return res.status(400).json({ error: 'Date and statusOfDay are required in the request body' });
    }

    try {
        const currentDate = new Date(date);

        // Find the record for the given date
        let dayRecord = await Day.findOne({ date: currentDate });

        if (!dayRecord) {
            // If no record exists for the date, create a new one
            const previousDay = await Day.findOne().sort({ date: -1 }); // Get the most recent day record
            const newStreak = previousDay && previousDay.statusOfDay === 'productive' && (currentDate - previousDay.date) / (1000 * 60 * 60 * 24) === 1
                ? previousDay.streak + 1
                : 1;

            dayRecord = await Day.create({
                date: currentDate,
                statusOfDay,
                streak: newStreak,
            });

            return res.json({ message: 'Day record created and streak updated', streak: dayRecord.streak });
        }

        // If the record already exists, update it
        if (dayRecord.statusOfDay === 'productive') {
            return res.json({ message: 'Streak already updated for this day', streak: dayRecord.streak });
        }

        const previousDay = await Day.findOne({ date: { $lt: currentDate } }).sort({ date: -1 }); // Get the most recent day before the current date
        const newStreak = previousDay && previousDay.statusOfDay === 'productive' && (currentDate - previousDay.date) / (1000 * 60 * 60 * 24) === 1
            ? previousDay.streak + 1
            : 1;

        dayRecord.statusOfDay = statusOfDay;
        dayRecord.streak = newStreak;
        await dayRecord.save();

        res.json({ message: 'Day record updated and streak updated', streak: dayRecord.streak });
    } catch (error) {
        console.error('Error updating streak:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { updateStreak };