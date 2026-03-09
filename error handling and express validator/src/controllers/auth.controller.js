

export async function registerUser(req, res, next) {

    const user = req.body;

    try{
        res.status(201).json({
            message: "User register successfully.",
            user
        })
    }catch(err){
        err.status = 409;
        next(err);
    }
}