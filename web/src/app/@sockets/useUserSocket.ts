import {Client} from "@stomp/stompjs";
import {_cookies} from "@/app/@axios/_cookies";
import {Message} from "@/app/@redux/@types/chat/Message";
import {_reduxCallback, useAppDispatch} from "@/app/@redux/_store";
import {useDispatch} from "react-redux";
import useCurrentUser from "@/app/@hooks/useCurrentUser";
import {User} from "@/app/@redux/@types/user/User";
import {useCallback} from "react";


const client = new Client({
    debug: function (str) {
        console.log(str);
    },
    beforeConnect: () => {
        const token = _cookies.get("authToken");
        client.configure({brokerURL: `ws://127.0.0.1:8080/api/socket?token=${token}`})
    }
});

export default function useUserSocket(currentUser: User | null) {

    const dispatch = useAppDispatch();

    const setOnCallback = useCallback(() => {
        client.onConnect = (frame) => {
            console.log('Connected: ' + frame);
            client.subscribe(`/topic/friends/${currentUser?.login}`, (greeting) => {
                const message: User[] = JSON.parse(greeting.body);
                dispatch(_reduxCallback.user.friends.setUserFriends(message))
                // if (chat) dispatch(_reduxCallback.chats.saveMessageChat({message: message, chat: chat}))
            });
        };
    }, [currentUser])


    const connectSocket = () => {
        if (!client.active) client.activate()
    }

    return {connectSocket, setOnCallback}

}