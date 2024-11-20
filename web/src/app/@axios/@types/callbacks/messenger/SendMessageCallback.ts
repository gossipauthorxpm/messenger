import {AlertCallback} from "@/app/@axios/@types/callbacks/alert/AlertCallback";
import {UpdateMessageChatType} from "@/app/@redux/@types/chat/UpdateMessagesChatType";

export interface SendMessageCallback extends AlertCallback {
    reduxCallback: (object: UpdateMessageChatType) => void;
}