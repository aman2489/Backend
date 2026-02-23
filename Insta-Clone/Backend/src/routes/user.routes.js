const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/user.controller");
const identifyUser = require("../middlewares/auth.middleware")


userRouter.post("/follow/:username", identifyUser, userController.followUserController);

userRouter.post("/unfollow/:username", identifyUser, userController.unFollowUserController);

userRouter.post("/follow/accept/:username", identifyUser, userController.acceptFollowController);

userRouter.post("/follow/reject/:username", identifyUser, userController.rejectFollowController);

module.exports = userRouter;