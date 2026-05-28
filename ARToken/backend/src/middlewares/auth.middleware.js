const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");


const authMiddleware = async (req, res, next) => {
    try{
        const accessToken = req.cookies.accessToken;

        if(!accessToken){
            res.status(401).json({
                message: "Unauthorized Access!"
            });
        }

        const decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        if(!decode){
            res.status(401).json({
                message: "Unauthorized Access!"
            });
        }

        const user = await userModel.findById(decode.id);

        if(!user){
            res.status(404).json({
                message: "User not found!"
            })
        }

        console.log(user);

        req.user = user;
        next();

    }catch(err){
        throw new Error(err);
    }
}

module.exports = authMiddleware;