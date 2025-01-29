require('dotenv').config();
const express = require('express');
const connectDB = require('./db/index');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
connectDB();

app.get('/', (req, res) => {
  res.send('<h1>Task Management API</h1>');
});

// Task routes
app.use('/api/tasks', taskRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
