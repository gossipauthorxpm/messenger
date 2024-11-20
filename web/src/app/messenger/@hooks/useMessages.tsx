import {Chat} from "@/app/@redux/@types/chat/Chat";
import useCurrentUser from "@/app/@hooks/useCurrentUser";
import {Message} from "@/app/@redux/@types/chat/Message";
import UserMessage from "@/app/messenger/@components/UserMessage";
import IncomeMessage from "@/app/messenger/@components/IncomeMessage";
import MessageComponent from "@/app/messenger/@components/MessageComponent";

export default function useMessages(chat: Chat | null) {

    const currentUser = useCurrentUser()

    /*Map messages in React components*/
    const mapMessages = () => {
        if (chat && chat.messages && currentUser) {
            return chat.messages.map((message: Message, key: number) => {
                return MessageComponent({
                    key: key,
                    message: message,
                    isCurrentUserMessage: message.sender.login === currentUser.login
                });
            })
        }
    }

    return {mapMessages}

}