"use client"

import {Divider, List, Paper, Stack} from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import ButtonsAndSearch from "@/app/messenger/@components/ButtonsAndSearch";
import ChatButton from "@/app/messenger/@components/ChatButton";
import DetailsChat from "@/app/messenger/@components/DetailsChat";
import SendMessageBlock from "@/app/messenger/@components/SendMessageBlock";
import ChatBlock from "@/app/messenger/@components/ChatBlock";

export default function Page() {
    return <>
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 2,
                    width: "75%",
                    height: "48em",
                },
                justifyContent: "center"
            }}
        >
            <Paper elevation={12}>
                <Stack direction={"row"} margin={2} spacing={1} height={"100%"} style={{
                    alignItems: "center"
                }}>
                    {/*!LEFT SIDE*/}
                    <Box width={"25%"} style={{
                        alignSelf: "self-start"
                    }}>
                        <ButtonsAndSearch/>
                        {/*chats*/}
                        <List sx={{
                            width: '100%',
                            maxWidth: 360,
                            height: "65vh",
                            overflowY: "scroll",
                            scrollbarWidth: "none"
                        }}>
                            <ChatButton/>
                            <Divider component="li"/>
                            <ChatButton/>
                            <Divider component="li"/>
                            <ChatButton/>
                        </List>
                    </Box>
                    <Divider orientation={"vertical"} style={{
                        height: "90%"
                    }}/>
                    {/*!RIGHT SIDE*/}
                    <Box height={"100%"} justifyContent={"center"} width={"100%"}>
                        <DetailsChat/>
                        <Divider/>
                        {/*chat*/}
                        <Stack height={"80%"} justifyContent={"space-between"}>
                            <ChatBlock/>
                            <Box width={"100%"} alignItems={"center"} display={"flex"}>
                                <Divider orientation={"horizontal"} style={{
                                    margin: 12
                                }}/>
                                {/*Send message block*/}
                                <SendMessageBlock/>
                            </Box>
                        </Stack>
                    </Box>
                </Stack>
            </Paper>
        </Box>
    </>
}