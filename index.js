require('dotenv').config();
const express = require('express');
const connectDB = require('./db/index.js');
const taskRoutes = require('./routes/taskRoutes.js');
const dayRoutes = require('./routes/dayRoutes.js'); // Ensure this is imported

const app = express();
const PORT = process.env.PORT || 8000; // Ensure correct port

app.use(express.json());
connectDB();

app.use('/api/tasks', taskRoutes);
app.use('/api/productivity', dayRoutes); // Ensure this matches the route path

app.get('/', (req, res) => {
  res.send('<h1>Productivity Tool APIs Running</h1>');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
