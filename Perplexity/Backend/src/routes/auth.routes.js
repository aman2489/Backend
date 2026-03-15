import { Router } from "express";
import { register, verifyEmail, getMe,login, resendVerification } from "../controllers/auth.contollers.js";
import { registerValidator, loginValidator } from "../validator/auth.validator.js";
import { verifyUser } from "../middlewares/auth.middleware.js";


const authRouter = Router();

authRouter.post("/register", registerValidator, register);

authRouter.get("/verify-email", verifyEmail);

authRouter.post("/login", loginValidator, login)

authRouter.get("/get-me", verifyUser, getMe);

authRouter.get("/resend-verification", resendVerification)

export default authRouter;