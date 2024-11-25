"use client"

import React, {useMemo} from 'react';
import DetailsChat from "@/app/messenger/@components/DetailsChat";
import {Divider, Stack} from "@mui/material";
import ChatBlock from "@/app/messenger/@components/ChatBlock";
import Box from "@mui/material/Box";
import SendMessageBlock from "@/app/messenger/@components/SendMessageBlock";
import {useSelectedChatDetails} from "@/app/messenger/@hooks/useSelectedChatDetails";

export default function Page () {
    return (<Box height={"100%"} justifyContent={"center"} width={"100%"}>
        <DetailsChat />
        <Divider/>
        {/*chat*/}
        <Stack height={"80%"} justifyContent={"space-between"}>
            <ChatBlock/>
            <Box width={"100%"} alignItems={"center"} display={"flex"}>
                {/*Send message block*/}
                <SendMessageBlock/>
            </Box>
        </Stack>
    </Box>);
};
