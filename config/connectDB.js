import mongoose from "mongoose";

const connectDB = async()=>{
    try {

        await mongoose.connect(process.env.DATABSE_URL);
        console.log(`The database has been connected successfully at ${process.env.DATABSE_URL}`)
        
    } catch (error) {
        console.log(error)
        
    }


}

export default connectDB;