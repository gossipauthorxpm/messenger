"use client"

import React, {FunctionComponent, useContext} from 'react';
import {Avatar, Divider, ListItemButton, Stack, Typography} from "@mui/material";
import {Chat} from "@/app/@redux/@types/chat/Chat";
import {ChatContext} from "@/app/messenger/@components/ChatLists";
import {useParams} from "next/navigation";

interface OwnProps {
    chat: Chat
    chatName?: string
}

type Props = OwnProps;

const ChatButton: FunctionComponent<Props> = (props) => {

    const chat: Chat = props.chat;
    const context = useContext(ChatContext);
    const params = useParams<{slug: string}>()

    return <>
        <ListItemButton onClick={() => {
            context.setCallback(chat.id)
        }} selected={Number(params.slug) === chat.id} alignItems="flex-start">
            <Stack direction="row" display={"flex"} width={"100%"} alignItems={"center"}>
                <Stack justifySelf={"flex-start"}>
                    <Avatar>{chat.isGroup ? "G" : "S"}</Avatar>
                </Stack>
                <Stack direction={"column"} ml={2}>
                    <Typography >{chat.chatName ? chat.chatName : props.chatName}</Typography>
                    <Typography fontSize={14}>LAST SENDER...</Typography>
                    <Typography fontSize={12}>LAST MESSAGE...</Typography>
                </Stack>
            </Stack>
        </ListItemButton>
        <Divider component="li"/>
    </>;
};

export default ChatButton;
