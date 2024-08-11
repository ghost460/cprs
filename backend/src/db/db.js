import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
const connectDB=async ()=>{
    try{
        // Assuming MONGODB_URI is mongodb://localhost:27017
        const conndb = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

        console.log(` Database Connected !!!: ${conndb.connection.host}`);
         
    }catch(error){
        console.log("MongoDB connection Error:", error);
        process.exit(1)
    }
}
export default connectDB