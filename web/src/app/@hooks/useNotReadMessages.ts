import {useAppSelector} from "@/app/@redux/_store";
import {Message} from "@/app/@redux/@types/chat/Message";

export const useNotReadMessages = () => {

    const chats = useAppSelector(data => data.chats.chats)

    const fetchNotReadMessages = () => {
        let notReadMessages: Message[] = []
        // if (chats) chats.map(chat => {
        //     if (chat.messages) chat.messages.map((message: Message) => {
        //         if (!message.read) notReadMessages.push(message)
        //     })
        // })
        return notReadMessages;
    }

    return {fetchNotReadMessages}

}