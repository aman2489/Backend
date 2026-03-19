import { Router } from "express";
import { deleteChat, getChats, getMessages, sendMessage } from "../controllers/chat.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";
const chatRouter = Router();

chatRouter.post("/message", verifyUser,sendMessage);

chatRouter.get("/", verifyUser, getChats);

chatRouter.get("/:chatId/messages", verifyUser, getMessages);

chatRouter.delete("/delete/:chatId", verifyUser, deleteChat);



export default chatRouter;