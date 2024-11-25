"use client"

import React, {FunctionComponent} from 'react';
import {List} from "@mui/material";
import useChats from "@/app/messenger/@hooks/useChats";
import Loading from "@/app/@components/Loading";
import {useRouter} from "next/navigation";
import {_paths} from "@/app/paths";


interface IChatContext {
    setCallback: (idChat: number) => void
}

export const ChatContext = React.createContext<IChatContext>({} as IChatContext);

const ChatLists: FunctionComponent = () => {
    const router = useRouter();
    const {chats, mapChats} = useChats()

    if (!chats) return <Loading/>

    return (
        <ChatContext.Provider value={{
            setCallback: (idChat: number) => {
                let route: string | ((id: number) => string) = _paths.root.messenger.chat.vars.path
                if (typeof route !== "string") router.push(route(idChat))
            },
        }}>
            <List sx={{
                width: '100%',
                maxWidth: 360,
                height: "65vh",
                overflowY: "scroll",
                scrollbarWidth: "none"
            }}>
                {mapChats()}
            </List>
        </ChatContext.Provider>
    );
};

export default ChatLists;
