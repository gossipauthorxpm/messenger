import {Chat} from "@/app/@redux/@types/chat/Chat";
import {Client} from "@stomp/stompjs";
import {SendChatSocket} from "@/app/@redux/@types/sockets/SendChatSocket";


export interface ChatSocket {
    chat: Chat
    sendMessage: (message: string) => void
    socket: Client
}