import mongoose from 'mongoose';
const DB_URL=process.env.MONGO_URI
export const connectDB=async()=>{
    try {
        if(!DB_URL){
            throw new Error("MONGODB_URL is not defined in environment variables");
        }
        const conn=await mongoose.connect(DB_URL);
        console.log("Connected to mongoDB",conn.connection.host);
        
    } catch (error) {
        console.error("Error Conncecting to mongoDB",error);
        process.exit(1); // 0 means success and 1 means failure
    }
}
