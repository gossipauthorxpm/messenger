"use client"
import React, {FunctionComponent} from 'react';
import {
    Backdrop, Button,
    CircularProgress,
    FormControl,
    Input,
    InputAdornment, Paper,
    Stack, TextField,
    Tooltip,
    Typography
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {GroupAdd} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";

import Box from "@mui/material/Box";

interface OwnProps {
}

type Props = OwnProps;

const ButtonsAndSearch: FunctionComponent<Props> = (props) => {

    const [openSingleChatBackdrop, setOpenSingleChatBackdrop] = React.useState(false);
    const [openGroupChatBackdrop, setOpenGroupChatBackdrop] = React.useState(false);

    const handleCloseSingleChatBackdrop = () => {
        setOpenSingleChatBackdrop(false);
    };
    const handleOpenSingleChatBackdrop = () => {
        setOpenSingleChatBackdrop(true);
    };


    const handleCloseGroupChatBackdrop = () => {
        setOpenGroupChatBackdrop(false);
    };
    const handleOpenGroupChatBackdrop = () => {
        setOpenGroupChatBackdrop(true);
    };


    return <>
        <Box>
            <Stack direction={"row"} spacing={2} alignItems="center" marginBottom={2}>
                <Tooltip title="Add chat">
                    <AddIcon cursor={"pointer"} onClick={handleOpenSingleChatBackdrop}/>
                </Tooltip>
                <Tooltip title="Add group chat">
                    <GroupAdd cursor={"pointer"} onClick={handleOpenGroupChatBackdrop}/>
                </Tooltip>
                <Tooltip title="Seach for chats">
                    <FormControl variant="standard">
                        <Input type={"search"} startAdornment={<InputAdornment position="start">
                            <SearchIcon/>
                        </InputAdornment>}/>
                    </FormControl>
                </Tooltip>
            </Stack>
        </Box>
        <Backdrop
            sx={(theme) => ({color: '#fff', zIndex: theme.zIndex.drawer + 1})}
            open={openSingleChatBackdrop}
        >
            <Paper elevation={12} sx={{padding: 12}}>
                <Typography variant="h6">
                    Enter recipient login
                </Typography>
                <Stack direction={"column"} spacing={2}>
                    <TextField></TextField>
                    <Button variant="contained" color="primary" onClick={handleCloseSingleChatBackdrop}>Add
                        chat</Button>
                </Stack>
            </Paper>
        </Backdrop>

        <Backdrop
            sx={(theme) => ({color: '#fff', zIndex: theme.zIndex.drawer + 1})}
            open={openGroupChatBackdrop}
        >
            <Paper elevation={12} sx={{padding: 12}}>
                <Typography variant="h6">
                    Enter name group chat
                </Typography>
                <Stack direction={"column"} spacing={2}>
                    <TextField></TextField>
                    <Button variant="contained" color="primary" onClick={handleCloseGroupChatBackdrop}>Add chat</Button>
                </Stack>
            </Paper>
        </Backdrop>
    </>;
};

export default ButtonsAndSearch;
