"use client"
import {
    Button,
    Container,
    FilledInput,
    FormControl,
    InputAdornment,
    InputLabel,
    Stack,
    Typography
} from "@mui/material";
import AbcIcon from "@mui/icons-material/Abc";
import KeyIcon from "@mui/icons-material/Key";
import LoginIcon from "@mui/icons-material/Login";
import React from "react";
import useAuth from "@/app/auth/hooks/useAuth";

export default function AuthForm() {

    const {register, onSubmit, handleSubmit} = useAuth()

    return <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Container>
                <Stack spacing={2}>
                    <Typography variant={"h4"}>Authorization</Typography>
                    <FormControl variant="filled">
                        <InputLabel htmlFor="filled-adornment-amount">Login</InputLabel>
                        <FilledInput
                            id="filled-adornment-amount"
                            startAdornment={<InputAdornment position="start"><AbcIcon/></InputAdornment>}
                            {...register("login")}
                        />
                    </FormControl>
                    <FormControl variant="filled">
                        <InputLabel htmlFor="filled-adornment-amount">Password</InputLabel>
                        <FilledInput
                            type={"password"}
                            id="filled-adornment-amount"
                            startAdornment={<InputAdornment position="start"><KeyIcon/></InputAdornment>}
                            {...register("password")}
                        />
                    </FormControl>

                    <Button type={"submit"} variant="contained" endIcon={<LoginIcon/>}>
                        Login
                    </Button>

                </Stack>
            </Container>
        </form>
    </>
}