import {Message} from "@/app/@redux/@types/chat/Message";
import {_api} from "@/app/@axios/axios";
import useAppNotifications from "@/app/@hooks/useAppNotifications";
import {_reduxCallback, useAppDispatch} from "@/app/@redux/_store";

export const useMessage = (message: Message) => {

    const {show} = useAppNotifications()
    const dispatch = useAppDispatch();

    const readMessage = () => {
        if (!message.read) _api.requests.messenger.chat.readMessage(message, {
            alertCallback: show,
            reduxCallback: (message: Message) => {
                dispatch(_reduxCallback.chats.readMessage(message))
            }
        })
    }

    return {readMessage}

}