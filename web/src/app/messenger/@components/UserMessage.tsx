"use client"
import React, {FunctionComponent} from 'react';
import {Avatar, ListItem, ListItemAvatar, ListItemText, Paper, Typography} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import {Message} from "@/app/@redux/@types/chat/Message";

interface OwnProps {
    message: Message;
    isCurrentUserMessage: boolean;
}

type Props = OwnProps;

const UserMessage: FunctionComponent<Props> = (props) => {

    const {message} = props;

    return (<ListItem sx={{
        alignSelf: props.isCurrentUserMessage ? "flex-end" : "flex-start",
        width: "50%"
    }}>
        <Paper elevation={12} sx={{p: 1, width:"100%"}}>
            <ListItemText primary={<Typography>{message.sender.name} {message.sender.surname}</Typography>} secondary={message.content}/>
        </Paper>
    </ListItem>);
};

export default UserMessage;
