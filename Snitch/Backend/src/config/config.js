import dotenv from "dotenv";
dotenv.config();


if(!process.env.MONGO_URI){
    throw Error("Mongo URI is missing!!")
}

if(!process.env.JWT_SECRET){
    throw Error("Mongo URI is missing!!")
}

if(!process.env.GOOGLE_CLIENT_ID){
    throw Error("Google Client ID is missing!!")
}

if(!process.env.GOOGLE_CLIENT_SECRET){
    throw Error("Google Client Secret is missing!!")
}

if(!process.env.NODE_ENV){
    throw Error("Node environment variable is missing!!")
}

if(!process.env.IMAGEKIT_PRIVATE_KEY){
    throw Error("ImageKit Private Key is missing!!")
}

const Config = {
    MONGO_URI : process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY
}


export default Config;