import express from "express";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
// import { testAi } from "./services/ai.service.js";
import morgan from "morgan";
import cors from "cors";


const app = express();

// testAi();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}))

//Health check
app.get("/", (req, res) => {
    res.json({message: "Sever is running on port 3000"});
})

//Routes
app.use("/api/auth", authRouter);

export default app;