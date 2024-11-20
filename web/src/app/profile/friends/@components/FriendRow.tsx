"use client"

import {Avatar, Paper, Stack, Tooltip, Typography} from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import {User} from "@/app/@redux/@types/user/User";
import useDeleteFriend from "@/app/profile/friends/@hooks/useDeleteFriend";

export default function FriendRow(props: { user: User }) {

    const user = props.user
    const {handleDeleteFriend} = useDeleteFriend(user)

    return <Paper elevation={12} sx={{width: "80%", padding: 2, margin: 1}}>
        <Stack direction={"row"}
               spacing={2}
               alignSelf={"flex-start"}
               justifyContent={"space-between"}
               width={"100%"}
        >
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
                <Avatar>A</Avatar>
                <Typography>{user.name}</Typography>
                <Typography>{user.surname}</Typography>
            </Stack>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
                <Tooltip title={"Send message"}>
                    <MessageIcon color={"secondary"} cursor={"pointer"}/>
                </Tooltip>
                <Tooltip title={"Delete friend"}>
                    <DeleteIcon onClick={handleDeleteFriend} color={"error"} cursor={"pointer"} />
                </Tooltip>
            </Stack>
        </Stack>
    </Paper>
}