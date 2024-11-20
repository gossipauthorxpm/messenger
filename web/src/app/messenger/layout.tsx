import React, { FunctionComponent } from 'react';
import {Divider, Paper, Stack} from "@mui/material";
import Box from "@mui/material/Box";
import ButtonsAndSearch from "@/app/messenger/@components/ButtonsAndSearch";
import ChatLists from "@/app/messenger/@components/ChatLists";

interface OwnProps {
    children: React.ReactNode
}

type Props = OwnProps;

const layout: FunctionComponent<Props> = (props) => {

  return (<Box
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
              {/*!LEFT SIDE*/}
              <Box width={"25%"} style={{
                  alignSelf: "self-start"
              }}>
                  <ButtonsAndSearch/>
                  {/*chats*/}
                  <ChatLists/>
              </Box>
              <Divider orientation={"vertical"} style={{
                  height: "90%"
              }}/>
              {/*!RIGHT SIDE*/}
              {props.children}
          </Stack>
      </Paper>
  </Box>);
};

export default layout;
