const userModel = require("../models/user.model");
const { registerService, loginService, getAccessTokenService } = require("../services/auth.service");


const register = async (req, res) => {
    const {accessToken, refreshToken, user} = await registerService(req.body);

    // console.log(accessToken, refreshToken, user);

    res.cookie("accessToken", accessToken), {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 10 * 60 * 1000
    };

    res.cookie("refreshToken", refreshToken), {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    };

    res.status(201).json({
        message: "User created successfully.",
        user
    })

}

const login = async (req, res) => {

    const {accessToken, refreshToken, user} = await loginService(req.body);
    
    res.cookie("accessToken", accessToken), {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 10 * 60 * 1000
    };

    res.cookie("refreshToken", refreshToken), {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    };

    res.status(200).json({
        message: "User loggedIn successfully.",
        user
    })
}   

const getAccessTokenController = async (req, res) => {
    
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken){
        return res.status(401).json({
            message: "Unauthorized access!"
        })
    }

    const accessToken = await getAccessTokenService(refreshToken);

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 10 * 60 * 1000
    });

    res.status(200).json({
        message: "Access token generated"
    })
}

const getMeController = (req, res) => {
    const user = req.user;

    return res.status(200).json({
        message: "Current user fetched",
        user
    })
}

module.exports = {
    register,
    login,
    getAccessTokenController,
    getMeController
}