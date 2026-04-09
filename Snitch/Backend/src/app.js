import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan"
import authRouter from "./routes/auth.routes.js";


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
    res.send("Hello from server")
})


export default app;