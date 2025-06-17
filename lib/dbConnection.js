import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionString = process.env.MONGODB_URI;

        // Error handling for missing MONGODB_URI environment variable
        if (!connectionString) {
            console.error("Missing MONGODB_URI environment variable.");
            process.exit(1);
        }

        // Connect to MongoDB using mongoose
        await mongoose.connect(connectionString);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};
export default connectDB;
