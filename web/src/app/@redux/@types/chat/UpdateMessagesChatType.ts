import {Chat} from "@/app/@redux/@types/chat/Chat";
import {Message} from "@/app/@redux/@types/chat/Message";

export interface UpdateMessagesChatType {
    messages: Message[]
    chat: Chat
}

export interface UpdateMessageChatType {
    message: Message
    chat: Chat
}