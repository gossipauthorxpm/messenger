import {AlertCallback} from "@/app/@axios/@types/callbacks/alert/AlertCallback";
import {Chat} from "@/app/@redux/@types/chat/Chat";

export interface GetAllChatsCallback extends AlertCallback {
    reduxCallback: (chats: Chat[]) => void
}