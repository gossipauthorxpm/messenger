import React, {FunctionComponent} from 'react';
import {User} from "@/app/@redux/@types/user/User";
import CircleIcon from '@mui/icons-material/Circle';
import {Stack, Typography} from "@mui/material";

interface OwnProps {
    user: User;
}

type Props = OwnProps;

const OnlineUser: FunctionComponent<Props> = (props) => {
    const user = props.user
    return <Stack direction={"row"} spacing={2} alignItems={"center"} justifyContent={"center"} alignContent={"center"}>
        {user.isOnline
            ? <><CircleIcon fontSize={"small"} color={"success"}/> <Typography>Online</Typography></>
            : <><CircleIcon fontSize={"small"} color={"error"}/> <Typography>Not online</Typography></>}
    </Stack>;
};

export default OnlineUser;
