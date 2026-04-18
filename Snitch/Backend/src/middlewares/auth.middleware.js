import jwt from 'jsonwebtoken';
import Config from '../config/config.js';
import userModel from "../models/auth.model.js";

export const authenticateUser = async (req, res, next) => {
    const token = req.cookies.jwt_token;

    if(!token) {
        return res.status(401).json({message: "Unauthorized asscess!"});
    }
    try{
        const decoded = jwt.verify(token, Config.JWT_SECRET);
        const user = await userModel.findById(decoded.id);

        if(!user){
            return res.status(404).json({message: "User not found!"});
        }

        req.user = user;
        next();
    }catch(error){
        return res.status(401).json({message: "Invalid token!"});
    }
}

export const authenticateSeller = async (req, res, next) => {
    const token = req.cookies.jwt_token;

    if(!token) {
        return res.status(401).json({message: "Unauthorized access!"});
    }

    try{
        const decoded = jwt.verify(token, Config.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        if(user.role !== 'seller') {
            return res.status(403).json({message: "Forbidden access!"});
        }

        req.user = user;
        next();
    }catch(error){
        console.log(error);
        return res.status(401).json({message: "Invalid token!"});
    }
}