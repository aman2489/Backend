const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        re: "posts",
        required: [true, "post Id is required for creating a like"]
    },
    user: {
        type: String,
        required: [true, "Username is required to create a like"]
    }
},{
    timestamps: true
})

likeSchema.index({post: 1, user: 1}, {unique: true});

const likeModel = mongoose.model("likes", likeSchema);

module.exports = likeModel;