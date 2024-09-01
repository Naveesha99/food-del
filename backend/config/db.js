import mongoose from "mongoose";

const connectDB = async () => {
//mongodb+srv://naveesha:naveesha123@cluster0.4eeh9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    await mongoose.connect('mongodb+srv://naveesha:naveesha123@cluster0.4eeh9.mongodb.net/food-del').then(()=>console.log("Connected to DB"));
}

export default connectDB;