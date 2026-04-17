import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan"
import authRouter from "./routes/auth.routes.js";
// import cors from "cors";
import passport from "passport";
import{ Strategy as GoogleStrategy } from "passport-google-oauth20";
import Config from "./config/config.js";
import productRouter from "./routes/product.routes.js";


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true
// }))

passport.use(new GoogleStrategy({
    clientID: Config.GOOGLE_CLIENT_ID,
    clientSecret: Config.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}))

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter)

app.get("/", (req, res) => {
    res.send("Hello from server")
})

export default app;