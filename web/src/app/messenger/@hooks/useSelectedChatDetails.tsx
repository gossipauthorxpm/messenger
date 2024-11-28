import useSelectedChat from "@/app/messenger/@hooks/useSelectedChat";
import {Chat} from "@/app/@redux/@types/chat/Chat";
import useCurrentUser from "@/app/@hooks/useCurrentUser";
import {useCallback, useMemo} from "react";
import OnlineUser from "@/app/@components/OnlineUser";
import {useAppSelector} from "@/app/@redux/_store";
import {Typography} from "@mui/material";
import fetchUserInFriends from "@/app/messenger/@hooks/fetchUserInFriends";

export const useSelectedChatDetails = () => {

    const {getSelectedChat} = useSelectedChat()
    const selectedChat = getSelectedChat()
    const currentUser = useCurrentUser()

    const getNameChat = () => {
        if (!currentUser) return <Typography>"No name chat!"</Typography>;
        if (selectedChat?.isGroup) {
            return <Typography>{selectedChat.chatName}</Typography>;
        }
        if (selectedChat && !selectedChat.isGroup) {
            let otherUser = selectedChat.usersChat.find(user => user.login !== currentUser.login);
            let friend = fetchUserInFriends(currentUser.friends, otherUser)
            if (typeof friend === "undefined") {
            } else otherUser = friend;
            if (otherUser) {
                return <><Typography>{`${otherUser.name} ${otherUser.surname}`}</Typography>
                    <OnlineUser user={otherUser}/></>;
            }
        }
        return "No name chat!"
    }

    return {getNameChat, currentUser, selectedChat}

}