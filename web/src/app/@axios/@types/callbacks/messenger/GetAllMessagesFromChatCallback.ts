import {AlertCallback} from "@/app/@axios/@types/callbacks/alert/AlertCallback";
import {Message} from "@/app/@redux/@types/chat/Message";
import {Chat} from "@/app/@redux/@types/chat/Chat";
import {UpdateMessagesChatType} from "@/app/@redux/@types/chat/UpdateMessagesChatType";

export interface GetAllMessagesFromChat extends AlertCallback {
    reduxCallback: (object: UpdateMessagesChatType) => void
}