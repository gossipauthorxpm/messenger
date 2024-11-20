"use client"

import {Paper, Stack, TextField, Typography} from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";
import useFriends from "@/app/profile/friends/@hooks/useFriends";
import useFriendRequests from "@/app/profile/friends/@hooks/useFriendRequests";


export default function Page() {

    const {mapFriends} = useFriends()
    const {mapFriendRequests, form} = useFriendRequests()
    
    return <Stack direction={"row"} justifyContent={"space-evenly"}>
        {/*FRIENDS*/}
        <Paper elevation={12} sx={{
            p: 2
        }}>
            <Stack width="50vw" height={"75vh"} alignItems={"center"} sx={{
                overflowY: "scroll",
                scrollbarWidth: "none"
            }}>
                <Typography variant={"h5"}>FRIENDS</Typography>
                {mapFriends()}
            </Stack>
        </Paper>
        {/*FriendRequest*/}
        <Paper elevation={12} sx={{
            p: 2
        }}>
            <Stack spacing={2} width={"25vw"} alignItems={"center"}>
                <Typography variant={"h5"}>FRIENDS REQUESTS</Typography>
                {/*OUT REQUEST*/}
                <form onSubmit={form.handleSubmit(form.onSubmit)}>
                    <Stack direction={"row"} spacing={2}>
                        <TextField label="Login" variant="standard" {...form.register("login")}/>
                        <Button type={"submit"} variant="outlined" color="primary">Add to friend</Button>
                    </Stack>
                </form>
                {mapFriendRequests()}
            </Stack>
        </Paper>
    </Stack>
}