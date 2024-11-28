import {Client} from "@stomp/stompjs";
import {_cookies} from "@/app/@axios/_cookies";
import {_reduxCallback, useAppDispatch, useAppSelector} from "@/app/@redux/_store";
import {User, UserActive} from "@/app/@redux/@types/user/User";
import {useCallback} from "react";
import {Message} from "@/app/@redux/@types/chat/Message";


const clientSocket = new Client({
    debug: function (str) {
        // console.log(str);
    },
    beforeConnect: () => {
        const token = _cookies.get("authToken");
        clientSocket.configure({brokerURL: `ws://127.0.0.1:8080/api/socket?token=${token}`})
    }
});

export function closeUserClientSocket() {
    clientSocket.deactivate({force: true});
}

export default function useUserSocket() {

    const currentUser: User | null = useAppSelector(data => data.user.user)
    const dispatch = useAppDispatch();

    const setOnCallback = useCallback(() => {
        clientSocket.onConnect = (frame) => {
            console.log('Connected: ' + frame);
            clientSocket.subscribe(`/topic/friends/${currentUser?.login}`, (greeting) => {
                const message: User[] = JSON.parse(greeting.body);
                dispatch(_reduxCallback.user.friends.setUserFriends(message))
                // if (chat) dispatch(_reduxCallback.chats.saveMessageChat({message: message, chat: chat}))
            });
        };
    }, [currentUser])


    const connectSocket = () => {
        if (!clientSocket.active && currentUser) {
            setOnCallback()
            clientSocket.activate()
        }
    }

    const sendMessageSocket = (userActive: UserActive) => {
        clientSocket.publish({
            destination: "/api/socket/sendUserActive",
            body: JSON.stringify({
                userActive: userActive,
            }),
        });
    }

    return {connectSocket, sendMessageSocket}

}