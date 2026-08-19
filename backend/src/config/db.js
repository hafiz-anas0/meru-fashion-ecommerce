const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            return;
        }

        if (mongoose.connection.readyState === 2) {
            return;
        }

        const connection = await mongoose.connect(process.env.MONGO_URI);

        console.log(
            `MongoDB connected: ${connection.connection.host}`
        );
    } catch (error) {
        console.error(
            `MongoDB connection error: ${error.message}`
        );

        throw error;
    }
};

module.exports = connectDB;