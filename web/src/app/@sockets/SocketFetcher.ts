import {Socket} from "node:net";
import {ChatSocket} from "@/app/@redux/@types/sockets/ChatSocket";
import {Chat} from "@/app/@redux/@types/chat/Chat";
import {Client} from "@stomp/stompjs";
import {_cookies} from "@/app/@axios/_cookies";
import {Message} from "@/app/@redux/@types/chat/Message";
import {_reduxCallback, AppDispatch} from "@/app/@redux/_store";
import {useCallback, useMemo} from "react";
import {SendChatSocket} from "@/app/@redux/@types/sockets/SendChatSocket";

export function fetchChatSocket(chat: Chat, dispatch: AppDispatch): ChatSocket {

    const client = new Client({
        debug: function (str) {
            // console.log(str);
        },
        beforeConnect: () => {
            const token = _cookies.get("authToken");
            client.configure({brokerURL: `ws://127.0.0.1:8080/api/socket?token=${token}`})
        }
    });

    client.onConnect = (frame) => {
        console.log('Connected: ' + frame);
        client.subscribe(`/topic/chat/${chat?.id}/messages`, (greeting) => {
            const message: Message = JSON.parse(greeting.body);
            if (chat) dispatch(_reduxCallback.chats.saveMessageChat({message: message, chat: chat}))
        });
    };


    const sendMessage = (message: string) => {
        client.publish({
            destination: "/api/socket/sendMessage",
            body: JSON.stringify({
                chatId: chat.id,
                message: {
                    content: message
                }
            }),
        });
    }

    return {
        socket: client,
        sendMessage: sendMessage,
        chat: chat
    }

}

