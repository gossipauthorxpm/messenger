import {Chat} from "@/app/@redux/@types/chat/Chat";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {WritableDraft} from "immer";
import {UpdateMessageChatType, UpdateMessagesChatType} from "@/app/@redux/@types/chat/UpdateMessagesChatType";
import {Message} from "@/app/@redux/@types/chat/Message";

type InitialState = {
    chats: Chat[] | undefined
}

export const _chatSlice = createSlice({
    name: 'chats',
    initialState: {
        chats: undefined
    } as InitialState,
    reducers: {
        _setChats: (state: WritableDraft<InitialState>, action: PayloadAction<Chat[]>) => {
            state.chats = action.payload
        },
        _updateMessagesChat(state: WritableDraft<InitialState>, action: PayloadAction<UpdateMessagesChatType>) {
            if (!state.chats) return;
            state.chats.forEach(chat => {
                if (chat.id === action.payload.chat.id) chat.messages = action.payload.messages
            })
        },
        _saveMessageChat(state: WritableDraft<InitialState>, action: PayloadAction<UpdateMessageChatType>) {
            if (!state.chats) return;
            state.chats.forEach(chat => {
                if (chat.id === action.payload.chat.id) chat.messages?.push(action.payload.message)
            })
        },
        _readMessage(state: WritableDraft<InitialState>, action: PayloadAction<Message>) {
            let messages: WritableDraft<Message>[] = []
            if (state.chats) {
                state.chats.forEach(chat => {
                    if (chat.messages) {
                        if (!chat.messages.find(message => message.id === action.payload.id))
                            messages.push(...chat.messages)
                    }
                })
            }
            messages.forEach(message => {
                if (message.id === action.payload.id) message.read = true
            })
        }
    },
})

export const {_setChats, _updateMessagesChat, _saveMessageChat, _readMessage} = _chatSlice.actions