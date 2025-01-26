import mangoose , {schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const daySchema = new Schema(
    {
        day: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        statusCode :{
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        Comment :{
            type: String,
            lowercase: true,
            trim: true,
        },

        streak : {
            type: Number,
            default: 0,
        },

        createAt: {
            type: Date,
            default: Date.now,
          },
      
          updateAt: {
            type: Date,
            default: Date.now,
          }
    },
    {
        timestamps: true,
    }

)