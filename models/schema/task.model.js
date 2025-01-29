const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    status: { type: String, default: 'pending', trim: true },
    category: { type: String, default: 'general', trim: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Task', taskSchema);
