import React, { FunctionComponent } from 'react';
import {Avatar, Stack, Typography} from "@mui/material";
import Button from "@mui/material/Button";

interface OwnProps {}

type Props = OwnProps;

const DetailsChat: FunctionComponent<Props> = (props) => {

  return (<Stack direction={"row"} justifyContent={"space-between"} m={2}>
      <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <Avatar>N</Avatar>
          <Typography>NAME RECIPIENT</Typography>
      </Stack>
      <Button variant={"outlined"}>Details</Button>
  </Stack>);
};

export default DetailsChat;
