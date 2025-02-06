import mongoose, { schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const daySchema = new Schema(
  {
    // day: {
    //     type: String,
    //     required: true,
    //     lowercase: true,
    //     trim: true,
    // },

    date: {
      type: Date,
      default: Date.now,
    },

    statusOfDay: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
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
      type: Date,
      default: Date.now,
    },

    updatedBy: {
      type: Date,
      default: Date.now,
    },
  },

  {
    timestamps: true,
  }
);
