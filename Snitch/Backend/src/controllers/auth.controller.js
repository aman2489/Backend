import jwt from "jsonwebtoken";
import userModel from "../models/auth.model.js";
import Config from "../config/config.js";


async function sendTokenResponse(user, res, message){
    const token = jwt.sign({
        id: user._id,

    }, Config.JWT_SECRET, {expiresIn: "3d"});

    res.cookie("jwt_token", token);

    return res.status(200).json({
            message: message,
            user: {
                userId: user._id,
                Fullname: user.fullname,
                Email: user.email,
                Contact: user.contact,
                Role: user.role
            },
        })
}

export async function register(req, res) {
    const {fullname, email, contact, password, isSeller = false} = req.body;

    try{
        const isUserExists = await userModel.findOne({
            $or: [{email}, {contact}]
        });

        if(isUserExists){
            return res.status(401).json({message: "User already exists with this email or phone number."});
        }

        const user = await userModel.create({
            email, fullname, contact, password,
            role: isSeller ? "seller" : "buyer"
        });

        await sendTokenResponse(user, res, "User registered successfully!!");
        

    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Server Error"});
    }
}

