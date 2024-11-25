import {Client} from "@stomp/stompjs";
import {Chat} from "@/app/@redux/@types/chat/Chat";
import {Message} from "esbuild";

export interface SendChatSocket {
    client: Client,
    chat: Chat,
    message: string,
}