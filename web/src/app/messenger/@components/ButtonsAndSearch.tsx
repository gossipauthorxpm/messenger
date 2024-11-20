import React, {FunctionComponent} from 'react';
import {FormControl, Input, InputAdornment, Stack, Tooltip} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {GroupAdd} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";

interface OwnProps {}

type Props = OwnProps;

const ButtonsAndSearch: FunctionComponent<Props> = (props) => {

  return <>
      <Box>
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
  </>;
};

export default ButtonsAndSearch;
