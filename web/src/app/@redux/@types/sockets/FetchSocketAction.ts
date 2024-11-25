import {AppDispatch} from "@/app/@redux/_store";
import {Chat} from "@/app/@redux/@types/chat/Chat";

export interface FetchSocketAction {
    dispatch: AppDispatch,
    chats: Chat[]
}