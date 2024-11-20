import React, { FunctionComponent } from 'react';
import {List} from "@mui/material";
import IncomeMessage from "@/app/messenger/@components/IncomeMessage";
import CurrentUserMessage from "@/app/messenger/@components/CurrentUserMessage";
import Box from "@mui/material/Box";

interface OwnProps {}

type Props = OwnProps;

const ChatBlock: FunctionComponent<Props> = (props) => {

  return (<Box sx={{
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
          <IncomeMessage/>
          {/*current user message*/}
          <CurrentUserMessage/>
      </List>
  </Box>);
};

export default ChatBlock;
