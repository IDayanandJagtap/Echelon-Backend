const mongoose = require("mongoose");

const daySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true,
  },
  statusOfDay: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    enum: ["productive", "not productive"],
  },
  comment: {
    type: String,
    lowercase: true,
    trim: true,
  },
  streak: {
    type: Number,
    default: 0,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}, { timestamps: true });

module.exports = mongoose.model("Day", daySchema);
