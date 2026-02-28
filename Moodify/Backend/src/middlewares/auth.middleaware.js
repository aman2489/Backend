const jwt = require("jsonwebtoken");


async function getUser(req, res, next) {
    
    const token = req.cookies.token;

    if(!token) {
        return res.status(400).json({message: "Token not provided."});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log(decoded)
        next();
    }catch(err){
        return res.status(401).json({
            message: "Invalid token"
        })
    }

}

module.exports = {getUser}