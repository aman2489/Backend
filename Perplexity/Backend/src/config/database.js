import mongoose from "mongoose";

export default async function connectToDb() {
    await mongoose.connect(process.env.MONGOOSE_URI + "Perplexity");
    console.log("Connected to MongoDB");
}