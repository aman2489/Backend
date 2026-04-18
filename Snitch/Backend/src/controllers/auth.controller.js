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
                fullname: user.fullname,
                email: user.email,
                contact: user.contact,
                role: user.role
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

export async function login(req,res) {
    const {email, password} = req.body;

    try{
        const user = await userModel.findOne({email}).select("+password");

        if(!user){
            return res.status(404).json({message: "User not found with this email."});
        }

        const isMatch = await user.comparePassword(password);

        if(!isMatch){
            return res.status(401).json({message: "Invalid credentials."});
        }

        await sendTokenResponse(user, res, "User logged in successfully!!");
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Server Error"});
    }
}

export async function googleCallback(req, res) {

    const {id, displayName, emails, photos} = req.user;
    const email = emails[0].value;
    const profilePic = photos[0].value;

    let user = await userModel.findOne({email});

    if(!user){
       user = await userModel.create({
        email,
        googleId: id,
        fullname: displayName,
       })
    }

    const token = jwt.sign({
        id: user._id,
    }, Config.JWT_SECRET, {expiresIn: "3d"});

    res.cookie("jwt_token", token);

    res.redirect("http://localhost:5173/");
}

export async function getMe(req, res) {
    const user = req.user;

    if(!user){
        return res.status(404).json({message: "User not found!"});
    }

    return res.status(200).json({
        message: "User retrieved successfully!",
        user: {
            userId: user._id,
            fullname: user.fullname,
            email: user.email,
            contact: user.contact,
            role: user.role
        }
    });
}
