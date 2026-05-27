const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateTokens");

const registerService = async (data) => {
    try{
        const {name, email, password} = data;

        if(!email || !password) throw new Error("all fields are required!");

        const isExists = await userModel.findOne({email});

        // console.log(isExists);

        if(isExists) throw new Error("User with this email already exists!");

        const hashedPass = bcrypt.hashSync(password, 10);

        const newUser = await userModel.create({
            name, email, password: hashedPass
        });

        const accessToken = generateAccessToken(newUser._id);
        const refreshToken = generateRefreshToken(newUser._id);

        newUser.refreshToken = refreshToken;
        await newUser.save();

        // console.log(accessToken, refreshToken, newUser);

        return{
            accessToken,
            refreshToken,
            user: newUser
        }
    }catch(err){
        throw new Error(err);
    }
}

const loginService = async (data) => {

    try{
        const{email, password} = data;

        if(!email || !password) throw new Error("All fields are required!")

        const isExists = await userModel.findOne({email});

        if(!isExists) throw new Error("User with this email does not exists!");

        const passMatch = bcrypt.compareSync(password, isExists.password);

        if(!passMatch) throw new Error("Inavlid credentials");

        const accessToken = generateAccessToken(isExists._id);
        const refreshToken = generateRefreshToken(isExists._id);

        isExists.refreshToken = refreshToken;
        await isExists.save();

        return {
            accessToken,
            refreshToken,
            user: isExists
        }
    }catch(err){
        throw new Error(err);
    }

}

const getAccessTokenService = async (refreshToken) => {

    const decode = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    if(!decode) throw new Error("Unauthorized!");

    const user = await userModel.findById(decode.id);

    if(!user) throw new Error("User not found!");

    // console.log(user);

    // console.log(refreshToken, "\n", user.refreshToken);

    if(refreshToken !== user.refreshToken) throw new Error("Unauthorized!");

    const accessToken = generateAccessToken(user._id);
    
    return accessToken;
}


module.exports = {
    registerService,
    loginService,
    getAccessTokenService
}