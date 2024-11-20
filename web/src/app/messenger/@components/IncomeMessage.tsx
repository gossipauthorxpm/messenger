import React, {FunctionComponent} from 'react';
import {Avatar, ListItem, ListItemAvatar, ListItemText, Paper} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";

interface OwnProps {
}

type Props = OwnProps;

const IncomeMessage: FunctionComponent<Props> = (props) => {

    return (<ListItem sx={{
        alignSelf: "flex-start",
        width: "50%"
    }}>
        <Paper elevation={12} sx={{p: 1, width: "100%"}}>
            <ListItemText primary="Photos" secondary="Jan 9, 2014"/>
        </Paper>
    </ListItem>);
};

export default IncomeMessage;
