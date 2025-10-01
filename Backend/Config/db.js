import mongoose from "mongoose";

export const connectDb = async () => {
  try{
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to Database')
  }catch(err){
    console.log('Connection to Database failed', err)
  }
};
