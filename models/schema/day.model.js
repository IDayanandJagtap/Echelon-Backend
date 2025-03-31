const mongoose = require("mongoose");

const daySchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    statusOfDay: {
      type: String,
      lowercase: true,
      trim: true,
      enum: ["productive", "not productive"],
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    comment: {
      type: String,
      lowercase: true,
      trim: true,
    },
    streak: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Add a compound unique index for date and userId
daySchema.index({ date: 1, userId: 1 }, { unique: true });

module.exports = mongoose.models.Day || mongoose.model("Day", daySchema);