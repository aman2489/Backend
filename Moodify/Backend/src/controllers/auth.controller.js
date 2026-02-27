const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerController(req, res){
    const {username, email, password} = req.body;

    const isUserExists = await userModel.findOne({
        $or: [
            {username},
            {email}
        ]
    });

    if(isUserExists){
        return res.status(400).json({message: "User With same username or email already exists"});
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password : hash
    })

    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET, {expiresIn: "3d"});

    res.cookie("token", token);

    return res.status(201).json({
        message: "User registered successfully.",
        user: {
            id: user._id,
            username: user.username,
            emai: user.email
        }
    })
}

async function loginController(req, res){
    const {username, email, password} = req.body;

    const user = await userModel.findOne({
        $or: [
            {username},
            {email}
        ]
    });

    if(!user){
        return res.status(400).json({message: "Inavlid User"});
    }

    const isPassValid = await bcrypt.compare(password, user.password);

    if(!isPassValid){
        return res.status(400).json({message: "Invalid Password"});
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET, {expiresIn: "3d"});

    res.cookie("token", token);

    return res.status(200).json({
        message: "User Logged In successfully.",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

module.exports = {
    registerController,
    loginController
}