const {Router} = require("express");
const upload = require("../middlewares/upload.middleware");
const songController = require("../controllers/song.Controller");


const songRouter = Router();

songRouter.post("/", upload.single("song"), songController.uploadSong);

songRouter.get("/", songController.getSong);

module.exports = songRouter;