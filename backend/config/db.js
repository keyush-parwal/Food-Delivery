import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://keyushparwal:keyush777@cluster0.sqouod2.mongodb.net/FOOD_DELIVERY').then(()=>console.log("DB Connected"));
}