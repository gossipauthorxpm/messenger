import {AlertCallback} from "@/app/@axios/@types/callbacks/alert/AlertCallback";
import {Message} from "@/app/@redux/@types/chat/Message";

export interface ReadMessageCallback extends AlertCallback {
    reduxCallback: (message: Message) => void
}