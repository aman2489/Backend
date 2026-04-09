import {Router} from "express";
import {register} from "../controllers/auth.controller.js"
import { registerUserValidator } from "../validator/auth.validator.js";


const authRouter = Router();

authRouter.post("/register", registerUserValidator, register);

export default authRouter;