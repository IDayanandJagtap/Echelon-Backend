require('dotenv').config();
const express = require('express');
const connectDB = require('./db/index.js');
const taskRoutes = require('./routes/taskRoutes.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
connectDB();

app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('<h1>Productivity Tool APIs Running</h1>');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
