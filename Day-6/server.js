const app = require("./src/app");
const mongoose = require("mongoose");

function connetToDb(){
    mongoose.connect("mongodb+srv://aman1100vishnoi_db_user:9cUPmlhXaQzYYqUQ@cluster0.5mh6c4v.mongodb.net/")
    .then(() => {
        console.log("Connected to DB");
    })
}
connetToDb();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})