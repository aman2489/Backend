import { useDispatch } from "react-redux";
import { initialiseSocketConnection } from "../services/chat.socket";
import { addNewMessage, createNewChat, setChats, setCurrentChatId, setError, setLoading } from "../chat.slice";
import { sendMessage } from "../services/chat.api";
export const useChat = () => {

    const dispatch = useDispatch();

    async function handleSendMessage({message, chatId}) {
        dispatch(setLoading(true));
        const data = await sendMessage({message, chatId});
        const {chat, aiMessage} = data;
        dispatch(createNewChat({chatId: chat._id, title: chat.title}));
        dispatch(addNewMessage({chatId: chat._id, content: message, role: "user"}));
        dispatch(addNewMessage({chatId: chat._id, content: aiMessage.content, role: aiMessage.role}));
        dispatch(setCurrentChatId(chat._id));
    }

    return {
        initialiseSocketConnection,
        handleSendMessage,
    }
}