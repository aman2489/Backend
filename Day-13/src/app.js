const express = require("express");
const app = express();
const authRouter = require("./routes/auth.routes")
const cookieParser = require("cookie-parser");


app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
    res.send("Homepage");
})

module.exports = app;