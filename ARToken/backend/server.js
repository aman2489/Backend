require("dotenv").config();
const app = require("./src/app");
const connectToDB = require("./src/config/db");

const port = process.env.PORT || 5000;

connectToDB();

app.listen(3000, () => {
    console.log(`Server is running on port ${port}`)
})