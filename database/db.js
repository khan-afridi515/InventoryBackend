//External modules
import mongoose from "mongoose";
import dns from "dns";

const connectDB = async () => {
    try {
        const uri = process.env.DB_URL;
        if (!uri || typeof uri !== 'string') {
            throw new Error('MongoDB URI is missing or invalid. Set db_url in your .env file.');
        }

        dns.setServers(['8.8.8.8', '1.1.1.1']);
        if (typeof dns.setDefaultResultOrder === 'function') {
            dns.setDefaultResultOrder('ipv4first');
        }

        await mongoose.connect(uri, {
            family: 4,
            connectTimeoutMS: 30000,
            serverSelectionTimeoutMS: 30000,
        });

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