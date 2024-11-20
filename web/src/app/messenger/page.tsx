"use client"

import {
    Avatar,
    Divider, FilledInput, FormControl, Input, InputAdornment, InputLabel,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Stack, TextField, Tooltip, Typography
} from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import AbcIcon from "@mui/icons-material/Abc";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import {GroupAdd} from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';

export default function Page() {

    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event: any, index: React.SetStateAction<number>) => {
        setSelectedIndex(index);
    };

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
                    {/*LEFT SIDE*/}
                    <Box width={"25%"} style={{
                        alignSelf: "self-start"
                    }}>
                        <Box>
                            {/*BUTTONS BAR AND SEARCH*/}
                            <Stack direction={"row"} spacing={2} alignItems="center" marginBottom={2}>
                                <Tooltip title="Add chat">
                                    <AddIcon cursor={"pointer"}/>
                                </Tooltip>
                                <Tooltip title="Add group chat">
                                    <GroupAdd cursor={"pointer"}/>
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
                        {/*chats*/}
                        <List sx={{
                            width: '100%',
                            maxWidth: 360,
                            height: "65vh",
                            overflowY: "scroll",
                            scrollbarWidth: "none"
                        }}>
                            <ListItemButton alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Brunch this weekend?"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                sx={{color: 'text.primary', display: 'inline'}}
                                            >
                                                Ali Connors
                                            </Typography>
                                            {" — I'll be in your neighborhood doing errands this…"}
                                        </React.Fragment>
                                    }
                                />
                            </ListItemButton>
                            <Divider component="li"/>
                            <ListItemButton alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg"/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Summer BBQ"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                sx={{color: 'text.primary', display: 'inline'}}
                                            >
                                                to Scott, Alex, Jennifer
                                            </Typography>
                                            {" — Wish I could come, but I'm out of town this…"}
                                        </React.Fragment>
                                    }
                                />
                            </ListItemButton>
                            <Divider component="li"/>
                            <ListItemButton alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg"/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Oui Oui"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                sx={{color: 'text.primary', display: 'inline'}}
                                            >
                                                Sandra Adams
                                            </Typography>
                                            {' — Do you have Paris recommendations? Have you ever…'}
                                        </React.Fragment>
                                    }
                                />
                            </ListItemButton>
                        </List>
                    </Box>
                    <Divider orientation={"vertical"} style={{
                        height: "90%"
                    }}/>
                    {/*right side*/}
                    <Box height={"100%"} justifyContent={"center"} width={"100%"}>
                        <Stack direction={"row"} justifyContent={"space-between"} m={2}>
                            <Stack direction={"row"} spacing={2} alignItems={"center"}>
                                <Avatar>N</Avatar>
                                <Typography>NAME RECIPIENT</Typography>
                            </Stack>
                            <Button variant={"outlined"}>Details</Button>
                        </Stack>
                        {/*chat*/}
                        <Stack height={"80%"} justifyContent={"space-between"}>
                            <Box sx={{
                                overflowY: "scroll",
                                height: "100%",
                                scrollbarWidth: "none",
                            }}>
                                {/*messages*/}
                                <List sx={{
                                    width: '100%',
                                    bgcolor: 'background.paper',
                                    display: "flex",
                                    flexDirection: "column"
                                }
                                }>
                                    {/*doesnt current user message*/}
                                    <ListItem sx={{
                                        alignSelf: "flex-start",
                                        width: "50%"
                                    }}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <ImageIcon/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Photos" secondary="Jan 9, 2014"/>
                                    </ListItem>
                                    {/*current user message*/}
                                    <ListItem sx={{
                                        alignSelf: "flex-end",
                                        width: "50%"
                                    }}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <ImageIcon/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Photos" secondary="Jan 9, 2014"/>
                                    </ListItem>
                                </List>
                            </Box>

                            <Box width={"100%"} alignItems={"center"} display={"flex"}>
                                <Divider orientation={"horizontal"} style={{
                                    margin: 12
                                }}/>
                                {/*Send message block*/}
                                <Stack direction={"row"} alignItems={"center"} spacing={4} width={"100%"}
                                       justifyContent={"center"}>
                                    <FormControl variant="filled" fullWidth sx={{
                                        width: "40vw;"
                                    }}>
                                        <InputLabel>Send message</InputLabel>
                                        <FilledInput id="filled-adornment-amount" sx={{
                                            width: "100%"
                                        }}/>
                                    </FormControl>
                                    <Button variant={"outlined"}>Send</Button>
                                </Stack>
                            </Box>
                        </Stack>
                    </Box>
                </Stack>
            </Paper>
        </Box>
    </>
}