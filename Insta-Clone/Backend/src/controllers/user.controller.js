const followModel = require("../models/follow.model");
const { findOne, findOneAndDelete } = require("../models/post.model");
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
        return res.status(400).json({message: "Follow request already sent or you already follows this user"});
    }

    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername,
    })

    return res.status(201).json({
        message: `Follow request sent to  ${followeeUsername}`,
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

async function acceptFollowController(req, res){
    const followReciever = req.params.username;
    const followSender = req.user.username;

    // console.log(`Follower: ${followSender}, \n Followee: ${followReciever}`);

    const isSenderExists = await userModel.findOne({
        username: followSender
    });

    if(!isSenderExists){
        return res.status(404).json({message: "User Not found"});
    }

    const followRequest = await followModel.findOneAndUpdate(
        {
            follower: followSender,
            followee: followReciever,
            status: "pending"
        },
        {status: "accepted"},
        {new: true}
    );

    if(!followRequest){
        return res.status(404).json({message: "Follow request not found"});
    }

    return res.status(200).json({
        message: "Follow Request Accepted Successfully.",
        follow: followRequest
    });
}

async function rejectFollowController(req, res){
    followReciever = req.params.username;
    followSender = req.user.username;

    const followRequest = await followModel.findOneAndDelete({
        follower: followSender,
        followee: followReciever,
        status: "pending"
    });

    if(!followRequest){
        return res.status(404).json({message: "Follow request nit found"});
    }

    return res.status(200).json({message: "Follow Request Rejected Successfully."});
}

module.exports = {
    followUserController,
    unFollowUserController,
    acceptFollowController,
    rejectFollowController
}