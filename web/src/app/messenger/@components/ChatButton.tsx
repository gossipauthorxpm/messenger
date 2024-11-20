import React, {FunctionComponent} from 'react';
import {Avatar, ListItemAvatar, ListItemButton, ListItemText, Typography} from "@mui/material";

interface OwnProps {
}

type Props = OwnProps;

const ChatButton: FunctionComponent<Props> = (props) => {

    return <ListItemButton alignItems="flex-start">
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
    </ListItemButton>;
};

export default ChatButton;
