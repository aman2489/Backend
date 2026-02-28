const jwt = require("jsonwebtoken");
const redis = require("../config/cache")


async function getUser(req, res, next) {
    
    const token = req.cookies.token;

    if(!token) {
        return res.status(400).json({message: "Token not provided."});
    }

    const isTokenBlacklisted = await redis.get(token);

    if(isTokenBlacklisted){
        return re.json(401).json({message: "Invalid Token"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(err){
        return res.status(401).json({
            message: "Invalid token"
        })
    }

}

module.exports = {getUser}