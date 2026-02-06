const express = require("express");
const userModel = require("../models/user.model");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");


authRouter.post("/register", async (req, res) => {
    const {name, email, password} = req.body;

    const isUserExists = await userModel.findOne({email});

    if(isUserExists){
        console.log(isUserExists);
        return res.status(409).json({
            message: "User with this email already exists"
        })
    }
    
    const user = await userModel.create({
        name,
        email,
        password
    })

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET
    )

    res.cookie("jwt_cookie", token);

    res.status(201).json({
        message: "User registered successfully",
        user,
        token
    })
});

module.exports = authRouter;