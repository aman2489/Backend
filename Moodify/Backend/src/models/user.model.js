const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Username must be unique"],
        required: [true, "Username must be true"]
    },
    email: {
        type: String,
        unique: [true, "email must be unique"],
        required: [true, "email must be true"]
    },
    password: {
        type: String,
        required: [true, "Password must be unique"],
        select: false
    }
})

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;