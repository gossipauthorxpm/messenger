import React, { FunctionComponent } from 'react';
import {Message} from "@/app/@redux/@types/chat/Message";
import UserMessage from "@/app/messenger/@components/UserMessage";
import IncomeMessage from "@/app/messenger/@components/IncomeMessage";


interface OwnProps {
    message: Message;
    isCurrentUserMessage: boolean;
    key: number
}

type Props = OwnProps;

const MessageComponent: FunctionComponent<Props> = (props) => {

  return <UserMessage isCurrentUserMessage={props.isCurrentUserMessage} key={props.key} message={props.message}/>

};

export default MessageComponent;
