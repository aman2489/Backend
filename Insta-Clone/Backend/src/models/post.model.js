const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: ""
    },
    imgUrl: {
        type:String,
        require: [true, "img_url is required to create a post"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        require: [true, "user id is required to create a post"]
    }
})

const postModel = mongoose.model("posts", postSchema);

module.exports = postModel;