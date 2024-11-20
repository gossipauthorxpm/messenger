"use client"

import {_reduxCallback, useAppDispatch, useAppSelector} from "@/app/@redux/_store";
import {Chat} from "@/app/@redux/@types/chat/Chat";
import {_api} from "@/app/@axios/axios";
import useAppNotifications from "@/app/@hooks/useAppNotifications";
import ChatButton from "@/app/messenger/@components/ChatButton";
import React from "react";
import useCurrentUser from "@/app/@hooks/useCurrentUser";
import fetchSingleChatName from "@/app/messenger/@hooks/fetchSingleChatName";

export default function useChats() {
    const currentUser = useCurrentUser()
    const chats = useAppSelector(data => data.chats.chats)
    const dispatch = useAppDispatch();
    const {show} = useAppNotifications()

    function fetchChats() {
        _api.requests.messenger.getAllChats({
            alertCallback: show,
            reduxCallback: (chats: Chat[]) => {
                dispatch(_reduxCallback.chats.setChats(chats));
            }
        })
    }

    function mapChats() {
        if (chats) return chats.map((chat: Chat, key: number) => {
                if (chat.isGroup) return <ChatButton key={key} chat={chat}/>
                else {
                    let chatName = fetchSingleChatName(chat.usersChat, currentUser)
                    return <ChatButton key={key} chat={chat} chatName={chatName}/>
                }
            }
        )
    }

    return {fetchChats, chats, mapChats}

}