import {Router} from "express";
import {login, register} from "../controllers/auth.controller.js"
import { loginUserValidator, registerUserValidator } from "../validator/auth.validator.js";


const authRouter = Router();

authRouter.post("/register", registerUserValidator, register);

authRouter.post("/login", loginUserValidator, login);

export default authRouter;