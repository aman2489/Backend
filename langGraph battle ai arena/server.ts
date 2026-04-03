import app from "./src/app.js";


app.get("/health", (req, res) => {
    res.status(200).json({status: "ok"});
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})