const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const {toFile} = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req, res){
    
    if (!req.file) {
        return res.status(400).json({ message: "Image is required" });
    }
    console.log(req.body, req.file);

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message: "Token not provided, Unauthorised access"
        })
    }

    let decoded = null;
    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    }catch(err){
        return res.status(401).json({
            message: "User not authorised"
        })
    }

    console.log(decoded);

    const file = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), "file"),
        fileName: "Test",
        folder: "cohort-2-insta-post-images"
    })
    
    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: decoded.id
    })

    res.status(201).json({
        message: "Post created successfully",
        post
    })
}

async function  getPostsController(req, res){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({message: "Unauthorised Access"});
    }

    let decoded = null;
    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    }catch(err){
        return res.status(401).json({"message": "Unauthorised User"});
    }
    // console.log(decoded);
    const posts = await postModel.find({
        user: decoded.id
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
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message: "Unauthorised Access"});
    }

    let decoded = null;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(401).json({message: "Invalid token"});
    }

    const userId = decoded.id;
    const postId = req.params.postId;

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

}

module.exports = {
    createPostController,
    getPostsController,
    getPostDetailsController
}