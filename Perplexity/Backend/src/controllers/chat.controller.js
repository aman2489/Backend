import { generateChatTitle, generateResponse } from "../services/ai.service.js";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";


export async function sendMessage(req, res) {
    const {message, chat: chatId} = req.body;
    
    let title = null, chat = null;
    
    if(!chatId) {
        title = await generateChatTitle(message);
        chat = await chatModel.create({
            user: req.user.id,
            title
        })
    }

    const userMessage = await messageModel.create({
            chat: chatId || chat._id,
            content: message, 
            role: "user"
        })
    
    const messages = await messageModel.find({chat: chatId || chat._id})
    

        const result = await generateResponse(messages);
        
        const aiMessage = await messageModel.create({
                chat: chatId || chat._id,
                content: result,
                role: "ai"
            })
            

    return res.status(201).json({
        success: true,
        title,
        chat,
        aiMessage
    })
}

export async function getChats(req, res) {
    const user = req.user;

    const chats = await chatModel.find({user: user.id});

    return res.status(200).json({
        message: "Chats retrieved successfully",
        success: true,
        chats
    })
}

export async function getMessages(req, res) {
    const { chatId } = req.params;

    const chat = await chatModel.findOne({_id: chatId, user: req.user.id}); 

    if(!chat) {
        return res.status(404).json({
            message: "Chat not found",
            success: false,
            err: "Chat not found or you don't have access to it"
        })
    }

    const messages = await messageModel.find({ chat: chatId });

    return res.status(200).json({
        message: "Messages retrieved successfully",
        success: true,
        messages
    });
}

export async function deleteChat(req, res) {

    const {chatId} = req.params;

    const user = req.user;

    const chat = await chatModel.findOneAndDelete({
        _id: chatId,
        user:user.id
    });

    if(!chat) {
        return res.status(404).json({
            message: "Chat not found",
            success: false,
            err: "Chat not found or you don't have access to it"
        })
    }

    await messageModel.deleteMany({chat: chatId});

    return res.status(200).json({
        message: "Chat deleted successfully",
        success: true,
    })
}

