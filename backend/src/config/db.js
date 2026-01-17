import mongoose from "mongoose"

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGO DB Connected")
    }catch(error){
        console.log("MONGO DB Connection failed", error.message);
        process.exit(1)
    }
}

export default connectDB;