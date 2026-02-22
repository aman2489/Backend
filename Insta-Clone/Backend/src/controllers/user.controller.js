const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

async function followUserController(req, res){
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    const isFolloweeExists = await userModel.findOne({
        username: followeeUsername
    });

    if(!isFolloweeExists){
        return res.status(404).json({message : "User you are trying to follow does not exists"});
    }

    if(followerUsername === followeeUsername){
        return res.status(400).json({message: "You cannot follow yourself...!!"});
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if(isAlreadyFollowing){
        return res.status(400).json({message: "You already follows this user...!!"});
    }

    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername
    })

    return res.status(201).json({
        message: `You are now following ${followeeUsername}`,
        follow: followRecord
    })
}

async function unFollowUserController(req, res){
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if(!isUserFollowing){
        return res.status(400).json({message: "You are not following this user."});
    }

    await followModel.findByIdAndDelete(isUserFollowing._id);

    return res.status(200).json({
        message: `Unfollowed ${followeeUsername} successfully.`
    })
}

module.exports = {
    followUserController,
    unFollowUserController
}