const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
    follower: {
        type: String,
        required: [true, "Follower is required"]
    },
    followee: {
        type: String,
        required: [true, "Followee is required"]
    },
    status:{
        type: String,
        enum: ["pending", "accepted"],
        default: "pending"
    }
}, {
    timestamps: true
})

followSchema.index({follower: 1, followee: 1}, {unique: true});
followSchema.index({followee: 1, status: 1});
followSchema.index({follower: 1, status: 1});
const followModel = mongoose.model("follows", followSchema);

module.exports = followModel;