import {useAppSelector} from "@/app/@redux/_store";
import {Chat} from "@/app/@redux/@types/chat/Chat";
import {useCallback} from "react";

export default function useSocketChat(chat: Chat | null) {

    const socket = useAppSelector(data => {
        return data.sockets.sockets.find((socket) => socket.chat.id === chat?.id)
    })

    const runSocket = useCallback(() => {
        if (socket) socket.socket.activate()
    }, [socket])

    const sendMessageSocket = useCallback((message: string) => {
        if (socket) socket.sendMessage(message)
    }, [socket])

    return {runSocket, socket, sendMessageSocket}

}