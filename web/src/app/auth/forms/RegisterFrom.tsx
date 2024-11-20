"use client"
import useAuth from "@/app/auth/hooks/useAuth";
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
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import useRegister from "@/app/auth/hooks/useRegister";
export default function RegisterFrom() {

    const {register, onSubmit, handleSubmit, errors} = useRegister()

    return <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Container>
                <Stack spacing={2}>
                    <Typography variant={"h4"}>Registration</Typography>
                    <FormControl variant="filled">
                        <InputLabel htmlFor="filled-adornment-amount">Login</InputLabel>
                        <FilledInput
                            id="filled-adornment-amount"
                            startAdornment={<InputAdornment position="start"><AbcIcon/></InputAdornment>}
                            {...register("login")}
                        />
                    </FormControl>
                    <FormControl variant="filled">
                        <InputLabel htmlFor="filled-adornment-amount">Email</InputLabel>
                        <FilledInput
                            error={errors.email?.message?.isWellFormed()}
                            id="filled-adornment-amount"
                            startAdornment={<InputAdornment position="start"><AlternateEmailIcon/></InputAdornment>}
                            {...register("email", {required: "Email address is required!"})}
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
                        Register
                    </Button>

                </Stack>
            </Container>
        </form>
    </>
}