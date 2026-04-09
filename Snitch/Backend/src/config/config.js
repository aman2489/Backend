import dotenv from "dotenv";
dotenv.config();


if(!process.env.MONGO_URI){
    throw Error("Mongo URI is missing!!")
}

if(!process.env.JWT_SECRET){
    throw Error("Mongo URI is missing!!")
}

const Config = {
    MONGO_URI : process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET
}


export default Config;