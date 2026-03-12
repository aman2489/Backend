import express from "express";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import { testAi } from "./services/ai.service.js";

const app = express();

testAi();

app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/auth", authRouter);

export default app;