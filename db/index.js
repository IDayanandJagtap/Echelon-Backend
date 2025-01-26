require("dotenv").config();
const mongoose = require('mongoose'); // Ensure mongoose is required
const DB_NAME = process.env.DB_NAME; // Use process.env to access environment variables

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1);
    }
};

module.exports = connectDB; // Use module.exports for CommonJS