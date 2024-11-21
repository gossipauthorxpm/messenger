"use client"
import React, {FunctionComponent, useEffect} from 'react';
import {ListItem, ListItemText, Paper, Stack, Typography} from "@mui/material";
import {Message} from "@/app/@redux/@types/chat/Message";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import {log} from "node:util";
import {useMessage} from "@/app/messenger/@hooks/useMessage";

interface OwnProps {
    message: Message;
    isCurrentUserMessage: boolean;
}

type Props = OwnProps;

const UserMessage: FunctionComponent<Props> = (props) => {

    const {message} = props;

    const {readMessage} = useMessage(message)

    useEffect(() => {
        readMessage()
    }, []);

    return (<ListItem sx={{
        alignSelf: props.isCurrentUserMessage ? "flex-end" : "flex-start",
        width: "50%"
    }}>
        <Paper elevation={12} sx={{p: 1, width: "100%"}}>
            <Stack direction="row" justifyContent="space-between" alignItems={"center"}>
                <ListItemText primary={<Typography>{message.sender.name} {message.sender.surname}</Typography>}
                              secondary={message.content}/>
                <DoneAllIcon color={message.read ? "info" : "action"}/>
            </Stack>
        </Paper>
    </ListItem>);
};

export default UserMessage;
