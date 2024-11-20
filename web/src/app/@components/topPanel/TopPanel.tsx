'use client'

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React from "react";
import AccountButton from "@/app/@components/topPanel/AccountButton";
import {Stack} from "@mui/material";

export default function TopPanel() {


    return <Box sx={{flexGrow: 1, marginBottom: 2}}>
        <AppBar position="static">
            <Toolbar>
                <Stack spacing={4} direction={"row"} alignItems={"center"}>
                    <AccountButton/>
                </Stack>
            </Toolbar>
        </AppBar>
    </Box>
}