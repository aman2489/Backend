require("dotenv").config();
const app = require("./src/app");
const connectToDb = require("./src/config/database");

connectToDb();
// console.log(process.env.MONGO_URI);

app.listen(3000, () => {
    console.log("server is running on port 3000");
})