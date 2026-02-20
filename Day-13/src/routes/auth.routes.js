const express = require("express");
const userModel = require("../models/user.model");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");


authRouter.post("/register", async (req, res) => {
    const {name, email, password} = req.body;

    const isUserExists = await userModel.findOne({email});

    if(isUserExists){
        console.log(isUserExists);
        return res.status(409).json({
            message: "User with this email already exists"
        })
    }
    
    const hash = crypto.createHash("md5").update(password).digest("hex");

    const user = await userModel.create({
        name,
        email,
        password: hash
    })

    const token = jwt.sign({id: user._id,},process.env.JWT_SECRET);

    res.cookie("jwt_cookie", token);

    res.status(201).json({
        message: "User registered successfully",
        user,
        token
    })
});

authRouter.post("/login", async (req, res) => {
    const {email, password} = req.body;

    const user = await userModel.findOne({email});

    if(!user){
        res.status(404).json({
            message: "404 | User not found"
        })
    }

    const isPasswordMatched = user.password === crypto.createHash("md5").update(password).digest("hex");

    if(!isPasswordMatched){
        res.status(401).json({
            message: "Invalid Password"
        })
    }

    const token = jwt.sign({id: user._id},process.env.JWT_SECRET);

    res.cookie("jwt_token", token);

    res.status(200).json({
        message: "User logged in successfully",
        user
    })
})

module.exports = authRouter;