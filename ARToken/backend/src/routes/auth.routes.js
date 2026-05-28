const authRouter = require('express').Router();
const { register, login, getAccessTokenController, getMeController } = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');


authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.get("/get-accessToken", getAccessTokenController);

authRouter.get("/me", authMiddleware, getMeController);

module.exports = authRouter