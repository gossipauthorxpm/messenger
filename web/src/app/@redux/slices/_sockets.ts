import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {WritableDraft} from "immer";
import {ChatSocket} from "@/app/@redux/@types/sockets/ChatSocket";
import {FetchSocketAction} from "@/app/@redux/@types/sockets/FetchSocketAction";
import {fetchChatSocket} from "@/app/@sockets/SocketFetcher";

type InitialState = {
    sockets: ChatSocket[];
}

export const _socketsSlice = createSlice({
    name: 'sockets',
    initialState: {
        sockets: []
    } as InitialState,
    reducers: {
        _fetchSocket: (state: WritableDraft<InitialState>, action: PayloadAction<ChatSocket>) => {
            if (state.sockets) state.sockets.push(action.payload);
        },
        _fetchSockets: (state: WritableDraft<InitialState>, action: PayloadAction<FetchSocketAction>) => {
            console.log(action)

            state.sockets = action.payload.chats.map(chat => {
                return fetchChatSocket(chat, action.payload.dispatch);
            })
        },
        _closeSockets: (state: WritableDraft<InitialState>) => {
            state.sockets.forEach(socket => {
                socket.socket.deactivate({force: true})
            })
            state.sockets = []
        }
    },
})

export const {_fetchSocket, _fetchSockets, _closeSockets} = _socketsSlice.actions