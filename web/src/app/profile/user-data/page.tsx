"use client"

import {Stack, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import React, {useEffect, useState} from "react";
import {useAppSelector} from "@/app/@redux/_store";
import useUpdate from "@/app/profile/user-data/@hooks/useUpdate";
import Loading from "@/app/@components/Loading";



export default function Page() {

    const currentUser = useAppSelector(data => data.user.user)
    const {register, onSubmit, handleSubmit} = useUpdate()

    // if(isConnected()) sendName();

    if (!currentUser) return <Loading/>
    return <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={"column"} spacing={2}>

            <TextField disabled label="Login" variant="standard" defaultValue={currentUser.login}/>
            <TextField disabled label="Email" variant="standard" defaultValue={currentUser.email}/>
            <TextField {...register("name")} label="Name" variant="standard" defaultValue={currentUser.name}/>
            <TextField {...register("surname")} label="Surname" variant="standard"
                       defaultValue={currentUser.surname}/>
            <TextField {...register("thirdname")} label="Thirdname" variant="standard"
                       defaultValue={currentUser.thirdname}/>
            <TextField {...register("phone")} label="Phone" variant="standard" defaultValue={currentUser.phone}/>
            <TextField disabled label="Created time" variant="standard" defaultValue={currentUser.createdTime}/>
            <Button type={"submit"} variant={"outlined"}>Save</Button>
        </Stack>

    </form>
}