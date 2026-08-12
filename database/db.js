//External modules
import mongoose from "mongoose";
import dns from "dns";

const connectDB = async () => {
    try {
        const uri = process.env.db_url;
        if (!uri || typeof uri !== 'string') {
            throw new Error('MongoDB URI is missing or invalid. Set db_url in your .env file.');
        }

        dns.setServers(['8.8.8.8', '1.1.1.1']);
        await mongoose.connect(uri, { family: 4 });

        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1); // Exit the process with failure
    }

}

// HdCQhTSSR3ZogchU
// uaziz9164_db_user

//export 
export default connectDB;