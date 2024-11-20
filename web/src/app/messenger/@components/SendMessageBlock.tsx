import React, { FunctionComponent } from 'react';
import {FilledInput, FormControl, InputLabel, Stack} from "@mui/material";
import Button from "@mui/material/Button";

interface OwnProps {}

type Props = OwnProps;

const SendMessageBlock: FunctionComponent<Props> = (props) => {

  return (<Stack direction={"row"} alignItems={"center"} spacing={4} width={"100%"}
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
  </Stack>);
};

export default SendMessageBlock;
