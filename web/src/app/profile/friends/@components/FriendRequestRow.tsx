"use client"


import {Avatar, Paper, Stack, Tooltip, Typography} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import React from "react";
import {FriendRequest} from "@/app/@redux/@types/user/friends/FriendRequest";
import useFriendRequest from "@/app/profile/friends/@hooks/useFriendRequest";

export default function FriendRequestRow(props: { friendRequest: FriendRequest }) {

    const sender = props.friendRequest.sender
    const {declineFriendRequest, acceptFriendRequest} = useFriendRequest(props.friendRequest)

    return <Paper elevation={12} sx={{width: "80%", padding: 2, margin: 1}}>
        <Stack direction={"row"} spacing={1} alignItems={"center"} justifyContent={"space-between"}
               width={"100%"}>
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
                <Avatar>AS</Avatar>
                <Typography>{sender.name}</Typography>
                <Typography>{sender.surname}</Typography>
            </Stack>
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
                <Tooltip title={"Accept friend"}>
                    <DoneIcon onClick={acceptFriendRequest} cursor={"pointer"} color={"success"}/>
                </Tooltip>
                <Tooltip title={"Decline friend"}>
                    <ClearIcon onClick={declineFriendRequest} cursor={"pointer"} color={"error"}/>
                </Tooltip>
            </Stack>
        </Stack>
    </Paper>
}