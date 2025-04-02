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
  {
    timestamps: true, // Enable createdAt and updatedAt fields
    toJSON: {
      transform: (doc, ret) => {
        // Format date, createdAt, and updatedAt to YYYY-MM-DD
        ret.date = ret.date.toISOString().split("T")[0];
        ret.createdAt = ret.createdAt.toISOString().split("T")[0];
        ret.updatedAt = ret.updatedAt.toISOString().split("T")[0];
        return ret;
      },
    },
  }
);

// Pre-save middleware to store only the date (strip time)
daySchema.pre("save", function (next) {
  this.date = new Date(this.date.toISOString().split("T")[0]); // Keep only the date part
  next();
});

// Add a compound unique index for date and userId
daySchema.index({ date: 1, userId: 1 }, { unique: true });

module.exports = mongoose.models.Day || mongoose.model("Day", daySchema);