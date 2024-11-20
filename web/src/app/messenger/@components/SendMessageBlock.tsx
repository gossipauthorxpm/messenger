"use client"
import React, {FunctionComponent} from 'react';
import {FilledInput, FormControl, InputLabel, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import useSendMessage from "@/app/messenger/@hooks/useSendMessage";

interface OwnProps {
}

type Props = OwnProps;

const SendMessageBlock: FunctionComponent<Props> = (props) => {

    const {sendMessage, register, handleSubmit} = useSendMessage()

    return (<Stack direction={"row"} alignItems={"center"} spacing={4} width={"100%"}
                   justifyContent={"center"}>
        <form onSubmit={handleSubmit(sendMessage)}>
            <FormControl variant="filled" fullWidth sx={{
                width: "40vw;"
            }}>
                <Stack direction={"row"} spacing={4} alignItems={"center"} width={"100%"}>
                    <Stack width="100%" alignItems={"center"}>
                        <InputLabel>Send message</InputLabel>
                        <FilledInput id="filled-adornment-amount" sx={{
                            width: "100%"
                        }} {...register("message")}/>
                    </Stack>
                    <Button type={"submit"} variant={"outlined"}>Send</Button>
                </Stack>
            </FormControl>
        </form>

    </Stack>);
};

export default SendMessageBlock;
