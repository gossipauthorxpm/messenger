import {Message} from "@/app/@redux/@types/chat/Message";
import {_api} from "@/app/@axios/axios";
import useAppNotifications from "@/app/@hooks/useAppNotifications";
import {_reduxCallback, useAppDispatch} from "@/app/@redux/_store";
import useCurrentUser from "@/app/@hooks/useCurrentUser";

export const useMessage = (message: Message) => {

    const {show} = useAppNotifications()
    const dispatch = useAppDispatch();
    const currentUser = useCurrentUser();

    const readMessage = () => {
        if (currentUser && currentUser.login === message.sender.login) return
        if (!message.read) _api.requests.messenger.chat.readMessage(message, {
            alertCallback: show,
            reduxCallback: (message: Message) => {
                // dispatch(_reduxCallback.chats.readMessage(message))
            }
        })
    }

    return {readMessage}

}