const {Router} = require("express");
const authRouter = Router();
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleaware");

authRouter.post("/register", authController.registerController)

authRouter.post("/login", authController.loginController);

authRouter.get("/get-me", authMiddleware.getUser,  authController.getMeController);

authRouter.get("/logout", authController.logoutController);

module.exports = authRouter;