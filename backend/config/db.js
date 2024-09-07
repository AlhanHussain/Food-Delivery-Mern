import mongoose from "mongoose";


export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://FoodProject:FoodProject@cluster0.lhdlr0w.mongodb.net/food-del-greatstack').then(()=>console.log("DB Connected"))
}