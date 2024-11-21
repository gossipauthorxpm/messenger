"use client"
import React, {FunctionComponent, useEffect} from 'react';
import {List} from "@mui/material";
import Box from "@mui/material/Box";
import useSelectedChat from "@/app/messenger/@hooks/useSelectedChat";
import Loading from "@/app/@components/Loading";
import useMessages from "@/app/messenger/@hooks/useMessages";

interface OwnProps {
}

type Props = OwnProps;

const ChatBlock: FunctionComponent<Props> = (props) => {

    const {getSelectedChat, fetchMessagesChat} = useSelectedChat()
    const selectedChat = getSelectedChat()
    const {mapMessages} = useMessages(selectedChat)

    useEffect(() => {
        if(selectedChat) fetchMessagesChat(selectedChat)
    }, [selectedChat]);

    if(!selectedChat) return <Loading/>

    return (<Box sx={{
        overflowY: "scroll",
        height: "100%",
        scrollbarWidth: "none",
    }}>
        {/*messages*/}
        <List sx={{
            width: '100%',
            bgcolor: 'background.paper',
            display: "flex",
            flexDirection: "column"
        }
        }>
            {mapMessages()}
        </List>
    </Box>);
};

export default ChatBlock;
