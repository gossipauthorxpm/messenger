import {User} from "@/app/@redux/@types/user/User";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {WritableDraft} from "immer";
import {UpdateUser} from "@/app/@redux/@types/user/UpdateUser";
import {FriendRequest} from "@/app/@redux/@types/user/friends/FriendRequest";

type InitialState = {
    friendRequests: FriendRequest[]
}

export const _friendRequests = createSlice({
    name: 'friendRequests',
    initialState: {
        friendRequests: []
    } as InitialState,
    reducers: {
        _setTakenFriendRequests: (state: WritableDraft<InitialState>, action: PayloadAction<FriendRequest[]>) => {
            state.friendRequests = action.payload
        },
        _deleteFriendRequest(state: WritableDraft<InitialState>, action: PayloadAction<FriendRequest>) {
            state.friendRequests = state.friendRequests.filter((friendRequest: FriendRequest) => friendRequest.id !== action.payload.id)
        }
    },
})

export const {_setTakenFriendRequests, _deleteFriendRequest} = _friendRequests.actions