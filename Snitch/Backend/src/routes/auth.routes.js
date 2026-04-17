import {Router} from "express";
import {googleCallback, login, register} from "../controllers/auth.controller.js"
import { loginUserValidator, registerUserValidator } from "../validator/auth.validator.js";
import passport from "passport";
import Config from "../config/config.js";

const authRouter = Router();

authRouter.post("/register", registerUserValidator, register);

authRouter.post("/login", loginUserValidator, login);

authRouter.get("/google",
    passport.authenticate("google", {scope: ["profile", "email"]})
 );

 authRouter.get("/google/callback",
    passport.authenticate("google", {
        session:false,
        failureRedirect: Config.NODE_ENV === "development" ? "http://localhost:5173/login" : "/login"
    }),
    googleCallback
 )

export default authRouter;