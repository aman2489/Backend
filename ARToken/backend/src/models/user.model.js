const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        require: [true, "Password is required"]
    },
    refreshToken: {
        type: String
    }
},
{ timestamps: true }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;