"use client"

import React from "react";
import Box from "@mui/material/Box";
import {Avatar, Badge, Divider, IconButton, ListItemIcon, Menu, MenuItem, Stack, Typography} from "@mui/material";
import {Logout, Settings} from "@mui/icons-material";
import {User} from "@/app/@redux/@types/user/User";
import useLogout from "@/app/@components/topPanel/@hooks/useLogout";
import useNavigate from "@/app/@components/topPanel/@hooks/useNavigate";
import MailIcon from '@mui/icons-material/Mail';
import {_paths} from "@/app/paths";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import useMenuBadgeContent from "@/app/@hooks/useMenuBadgeContent";

type Props = {
    user: User
}

export default function AccountMenu(props: Props) {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const {newFriendsRequests, fetchNotReadMessages} = useMenuBadgeContent()

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = useLogout({callback: handleClose})

    const navigateProfile = useNavigate({path: _paths.root.profile.userData.vars, callback: handleClose})
    const navigateMessenger = useNavigate({path: _paths.root.messenger.vars, callback: handleClose})

    const avatar = () => {
        if (props.user.name && props.user.surname) {
            return <Avatar>{`${props.user.name[0]}${props.user.surname[0]}`.toUpperCase()}</Avatar>
        }
        return <Avatar>{props.user.login[0].toUpperCase()}</Avatar>
    }

    return <React.Fragment>
        <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
            <IconButton
                onClick={handleClick}
                // sx={{ml: 2}}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                {avatar()}
            </IconButton>
        </Box>
        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
                paper: {
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&::before': {
                            content: "''",
                            display: 'block',
                            // position: 'absolute',
                            top: 0,
                            // right: 58,
                            width: 20,
                            height: 10,
                            bgcolor: 'background.paper',
                            // transform: 'translateY(-20%) rotate(45deg)',
                            // zIndex: 0,
                        },
                    },
                },
            }}
            transformOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        >
            <MenuItem onClick={navigateProfile}>
                <Stack direction={"row"} spacing={1}>
                    <Badge badgeContent={newFriendsRequests()} color="error"><AccountBoxIcon/></Badge>
                    <Typography>{`${props.user.name} ${props.user.surname}`}</Typography>
                </Stack>
            </MenuItem>
            <MenuItem onClick={navigateMessenger}>
                <ListItemIcon>
                    <Badge badgeContent={fetchNotReadMessages().length} color="primary">
                        <MailIcon color="action"/>
                    </Badge>
                </ListItemIcon>
                Messenger
            </MenuItem>
            <Divider/>
            <MenuItem onClick={handleClose}>
                <ListItemIcon>
                    <Settings/>
                </ListItemIcon>
                Settings
            </MenuItem>
            <MenuItem onClick={logout}>
                <ListItemIcon>
                    <Logout/>
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
    </React.Fragment>

}
