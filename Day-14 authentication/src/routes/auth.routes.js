const express = require("express");
const userModel = require("../models/user.model");
const authRouter = express.Router();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { mongo, default: mongoose } = require("mongoose");


/**
 * POST /api/auth/register
 */
authRouter.post("/register",async (req, res) => {
    const {name, email, password} = req.body;

    const isUserExists = await userModel.findOne({email});

    if(isUserExists){
        return res.status(409).json({"message": "Email already exists"});
    }
    
    const hash = crypto.createHash("sha256").update(password).digest("hex");

    const user = await userModel.create({
        name, email, password: hash
    })

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET, {expiresIn: "1h"})

    res.cookie("token", token);

    res.status(201).json({
        message: "User  registered successfully",
        user
    })
})

authRouter.get("/get-me", async (req, res) => {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id);

    res.json({
        name: user.name,
        email: user.email
    })
})

authRouter.post("/login", async (req, res) => {
    const {email, password} = req.body;

    const user = await userModel.findOne({email});

    if(!user){
        return res.json({
            message: "User does not exists"
        })
    }

    const hash = crypto.createHash("sha256").update(password).digest("hex");

    const isPassValid = hash === user.password;

    if(!isPassValid){
        return res.json({message: "Invalid Password"});
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);

    res.cookie("token", token);

    res.status(200).json({
        message: "User logged in successfully",
        name: user.name,
        email: user.email
    })
})

module.exports = authRouter;