import mongoose from "mongoose";

export const connectDb = async () => {
  try{
    await mongoose.connect("mongodb+srv://flavor-stack:Flavorstack2526@cluster0.jjprk08.mongodb.net/")
    console.log('Connected to Database')
  }catch(err){
    console.log('Connection to Database failed', err)
  }
};
