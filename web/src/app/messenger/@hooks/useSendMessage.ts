import {_api} from "@/app/@axios/axios";
import useSelectedChat from "@/app/messenger/@hooks/useSelectedChat";
import {_reduxCallback, useAppDispatch} from "@/app/@redux/_store";
import useAppNotifications from "@/app/@hooks/useAppNotifications";
import {SubmitHandler, useForm} from "react-hook-form";
import {RegisterRequestType} from "@/app/@axios/@types/auth/RegisterRequestType";
import useSocketChat from "@/app/messenger/@hooks/useSocketChat";

type MessageForm = {
    message: string;
}

export default function useSendMessage() {

    const {register, handleSubmit} = useForm<MessageForm>()
    const {getSelectedChat} = useSelectedChat()
    const selectedChat = getSelectedChat()
    const dispatch = useAppDispatch()
    const {show} = useAppNotifications()
    const {runSocket, socket, sendMessageSocket} = useSocketChat(selectedChat)

    const sendMessage: SubmitHandler<MessageForm> = (data: MessageForm) => {
        //
        // if (selectedChat) _api.requests.messenger.chat.sendMessage({
        //     chat: selectedChat,
        //     content: data.message,
        // }, {
        //     alertCallback: show,
        //     reduxCallback: object => {
        //         dispatch(_reduxCallback.chats.saveMessageChat({
        //             message: object.message,
        //             chat: object.chat
        //         }))
        //     }
        // })
        sendMessageSocket(data.message)
    }

    return {sendMessage, register, handleSubmit, selectedChat, runSocket, socket}

}