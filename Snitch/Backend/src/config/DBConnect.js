import mongoose from "mongoose";
import Config from "./config.js";

const connectToDB = async () => {
    await mongoose.connect(Config.MONGO_URI);
    console.log("Connected to MongoDB");
}

export default connectToDB;