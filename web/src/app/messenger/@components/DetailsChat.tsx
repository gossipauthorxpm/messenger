"use client"
import React, {FunctionComponent} from 'react';
import {Avatar, Stack, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import useSelectedChat from "@/app/messenger/@hooks/useSelectedChat";
import {useSelectedChatDetails} from "@/app/messenger/@hooks/useSelectedChatDetails";

interface OwnProps {
}

type Props = OwnProps;

const DetailsChat: FunctionComponent<Props> = (props) => {

    const {getNameChat} = useSelectedChatDetails()

    return (<Stack direction={"row"} justifyContent={"space-between"} m={2}>
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Avatar>N</Avatar>
            <Typography>{getNameChat()}</Typography>
        </Stack>
        <Button variant={"outlined"}>Details</Button>
    </Stack>);
};

export default DetailsChat;
