import { initialiseSocketConnection } from "../services/chat.socket";

export const useChat = () => {
    return {
        initialiseSocketConnection,
    }
}