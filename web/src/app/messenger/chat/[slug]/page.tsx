"use client"

import React from 'react';
import DetailsChat from "@/app/messenger/@components/DetailsChat";
import {Divider, Stack} from "@mui/material";
import ChatBlock from "@/app/messenger/@components/ChatBlock";
import Box from "@mui/material/Box";
import SendMessageBlock from "@/app/messenger/@components/SendMessageBlock";

export default function Page () {

    return (<Box height={"100%"} justifyContent={"center"} width={"100%"}>
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
    </Box>);
};
