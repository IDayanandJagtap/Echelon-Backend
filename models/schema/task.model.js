const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // Add userId to link tasks with users
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    status: { type: String, default: 'pending', trim: true },
    category: { type: String, default: 'general', trim: true },
    taskDate: { type: Date, required: true }, // Add taskDate to track dates
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Task', taskSchema);
