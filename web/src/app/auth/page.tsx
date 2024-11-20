"use client"

import {Container, Stack, Typography} from "@mui/material";
import React from "react";
import AuthForm from "@/app/auth/forms/AuthForm";
import RegisterFrom from "@/app/auth/forms/RegisterFrom";

export default function Page() {

    return <>
        <Container style={
            {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center"
            }
        }>
            <Stack direction={"row"} spacing={16}>
                <AuthForm/>
                <RegisterFrom/>
            </Stack>
        </Container>
    </>
}