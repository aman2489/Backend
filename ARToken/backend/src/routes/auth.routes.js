const authRouter = require('express').Router();
const { register, login, getAccessTokenController } = require('../controllers/auth.controller');


authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.get("/get-accessToken", getAccessTokenController);

module.exports = authRouter