import useChats from "@/app/messenger/@hooks/useChats";
import {Chat} from "@/app/@redux/@types/chat/Chat";
import {_api} from "@/app/@axios/axios";
import useAppNotifications from "@/app/@hooks/useAppNotifications";
import {UpdateMessagesChatType} from "@/app/@redux/@types/chat/UpdateMessagesChatType";
import {_reduxCallback, useAppDispatch} from "@/app/@redux/_store";
import {useParams} from "next/navigation";

export default function useSelectedChat() {

    const idChat = Number(useParams<{ slug: string }>().slug);
    const {chats} = useChats()
    const {show} = useAppNotifications()
    const dispatch = useAppDispatch()


    let selectedChat: Chat | null = null
    if (chats) chats.forEach((chat: Chat) => {
        if (chat.id === idChat) selectedChat = chat
    })

    const fetchMessagesChat = (chat: Chat) => {
        if (!chat.messages) {
            _api.requests.messenger.chat.getAllMessagesChat(chat, {
                alertCallback: show,
                reduxCallback: (object: UpdateMessagesChatType) => {
                    dispatch(_reduxCallback.chats.updateMessagesChat({
                        messages: object.messages,
                        chat: object.chat
                    }))
                }
            })
        }
    }


    return {selectedChat, fetchMessagesChat}

}