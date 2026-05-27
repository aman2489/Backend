const authMiddleware = require("../middlewares/auth.middleware");

const homeRouter = require("express").Router();

homeRouter.get("/", authMiddleware, (req, res) => {
    return res.status(200).json({
        message: "Home fetched."
    });
});

module.exports = homeRouter;