import useSelectedChat from "@/app/messenger/@hooks/useSelectedChat";
import {Chat} from "@/app/@redux/@types/chat/Chat";
import useCurrentUser from "@/app/@hooks/useCurrentUser";
import {useCallback, useMemo} from "react";

export const useSelectedChatDetails = () => {

    const {getSelectedChat} = useSelectedChat()
    const selectedChat = getSelectedChat()
    const currentUser = useCurrentUser()

    const getNameChat = () => {
        if (!currentUser) return "No name chat!";
        if (selectedChat?.isGroup) {
            return selectedChat.chatName;
        }
        if (selectedChat && !selectedChat.isGroup) {
            const otherUser = selectedChat.usersChat.find(user => user.login !== currentUser.login);
            if (otherUser) {
                return `${otherUser.name} ${otherUser.surname}`;
            }
        }
        return "No name chat!"
    }

    return {getNameChat, currentUser, selectedChat}

}