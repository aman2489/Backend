

export async function registerUser(req, res, next) {
    try{
        throw new Error("User with same email already Exists");
    }catch(err){
        err.status = 409;
        next(err);
    }
}