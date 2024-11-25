"use client"
import React, {FunctionComponent, useEffect, useRef} from 'react';
import {List} from "@mui/material";
import Box from "@mui/material/Box";
import useSelectedChat from "@/app/messenger/@hooks/useSelectedChat";
import Loading from "@/app/@components/Loading";
import useMessages from "@/app/messenger/@hooks/useMessages";
import useSocketChat from "@/app/messenger/@hooks/useSocketChat";

interface OwnProps {
}

type Props = OwnProps;

const ChatBlock: FunctionComponent<Props> = (props) => {
    const ref = useRef<HTMLElement>(null);
    const {getSelectedChat, fetchMessagesChat} = useSelectedChat()
    const selectedChat = getSelectedChat()
    const {mapMessages} = useMessages(selectedChat)



    useEffect(() => {
        if(selectedChat) {
            fetchMessagesChat(selectedChat)
        }
        ref.current?.scroll(0, 10000000)
    }, [selectedChat]);

    if(!selectedChat) return <Loading/>

    return (<Box ref={ref} sx={{
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
