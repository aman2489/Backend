const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const {toFile} = require("@imagekit/nodejs");
const likesModel = require("../models/likes.model");

const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req, res){
    
    if (!req.file) {
        return res.status(400).json({ message: "Image is required" });
    }

    const file = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), "file"),
        fileName: "Test",
        folder: "cohort-2-insta-post-images"
    })
    
    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: req.user.id
    })

    res.status(201).json({
        message: "Post created successfully",
        post
    })
}

async function  getPostsController(req, res){

    const userId = req.user.id;
    const posts = await postModel.find({
        user: userId
        })

        if(posts.length === 0){
            return res.status(404).json({message: "No posts made by the user yet"})
        }

    // console.log(posts);
    res.status(200).json({
        message: "Posts fetched sucessfully",
        posts
    })

}

async function getPostDetailsController(req, res){

    const userId = req.user.id;
    const postId = req.params.postId;

    try{
        const post = await postModel.findById(postId );

    if(!post){
        return res.status(404).json({message: "Post not found"});
    }

    const isValidUser = post.user.toString() === userId;

    if(!isValidUser){
        return re.status(403).json({message: "Forbidden Content"})
    }

    return res.status(200).json({
        message: "Post fetched successfully",
        post
    })
    }catch(err){
        return res.status(500).json({message: "Error fetching post, try again"});
    }

}

async function likePostController(req, res){
    const user = req.user.username;
    const postId = req.params.postId;
    // console.log(user);

    const post = await postModel.findById(postId);

    if(!post){
        return res.status(404).json({message: "Post not found"});
    }

    const isPostLikedAlready = await likesModel.findOne({
        post: postId,
        user: user
    })

    if(isPostLikedAlready){
        return res.status(400).json({message: "You have already liked the post"});
    }
    const like = await likesModel.create({
        post: postId,
        user: user
    })

    return res.status(200).json({
        message: "Liked the post successfully.",
        like
    })
}

module.exports = {
    createPostController,
    getPostsController,
    getPostDetailsController,
    likePostController
}