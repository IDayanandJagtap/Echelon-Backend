require("dotenv").config();
const express = require("express");
const connectDB = require("./db/index.js");
const taskRoutes = require("./routes/taskRoutes.js");
const dayRoutes = require("./routes/dayRoutes.js");
const quoteRoutes = require("./routes/quoteRoutes.js");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
connectDB();

// Register routes
app.use("/api/tasks", taskRoutes); // Task-related routes
app.use("/api/day", dayRoutes); // Day-related routes
app.use("/api/quote", quoteRoutes); // Quote-related routes

app.get("/", (req, res) => {
  res.send("<h1>Productivity Tool APIs Running</h1>");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});