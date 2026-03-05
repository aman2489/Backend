const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}))

/**
 * Routes
*/
const authRouter = require("./routes/auth.routes");
const songRouter = require("./routes/song.routes");
app.use("/api/auth", authRouter);
app.use("/api/song", songRouter);


module.exports = app;