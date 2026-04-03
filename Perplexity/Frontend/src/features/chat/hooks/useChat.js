import { useDispatch } from "react-redux";
import { initialiseSocketConnection } from "../services/chat.socket";
import { addMessages, addNewMessage, createNewChat, setChats, setCurrentChatId, setError, setLoading } from "../chat.slice";
import { getChats, getMessages, sendMessage } from "../services/chat.api";
export const useChat = () => {

    const dispatch = useDispatch();

    async function handleSendMessage({message, chatId}) {
        dispatch(setLoading(true));
        const data = await sendMessage({message, chatId});
        const {chat, aiMessage} = data;
        if(!chatId){
            dispatch(createNewChat({chatId: chat._id, title: chat.title}));
        }
        dispatch(addNewMessage({chatId: chatId ||chat._id, content: message, role: "user"}));
        dispatch(addNewMessage({chatId: chatId || chat._id, content: aiMessage.content, role: aiMessage.role}));
        dispatch(setCurrentChatId(chat._id));
    }

    async function handleGetChats() {
        dispatch(setLoading(true));
        const data = await getChats();
        const {chats} = data;
        dispatch(setChats(chats.reduce((acc, chat) => {
            acc[chat._id] = {
                id: chat._id,
                title: chat.title,
                messages: [],
                lastUpdated: chat.updatedAt
            }
            return acc;
        }, {})));
         dispatch(setLoading(false));
    }

    async function handleOpenChat(chatId, chats) {
        
        if(chats[chatId]?.messages.length === 0){

            const data = await getMessages(chatId);
            const {messages} = data;
            const formatttedMessages = messages.map((message) => ({
                content: message.content,
                role: message.role
            }))
            dispatch(addMessages({chatId, messages: formatttedMessages}));
        }

         dispatch(setCurrentChatId(chatId));
    }

    return {
        initialiseSocketConnection,
        handleSendMessage,
        handleGetChats,
        handleOpenChat
    }
}