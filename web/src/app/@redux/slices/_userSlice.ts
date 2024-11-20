import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "@/app/@redux/@types/user/User";
import {UpdateUser} from "@/app/@redux/@types/user/UpdateUser";
import {WritableDraft} from "immer";

type InitialState = {
    user: User | null
}

export const _userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null
    } as InitialState,
    reducers: {
        _setUser: (state: WritableDraft<InitialState>, action: PayloadAction<User>) => {
            state.user = action.payload
        },
        _deleteUser: (state) => {
            state.user = null
        },
        _updateUser: (state: WritableDraft<InitialState>, action: PayloadAction<UpdateUser>) => {
            if (state.user) state.user = {
                login: state.user.login,
                email: state.user.email,
                createdTime: state.user.createdTime,
                ...action.payload
            }
        },
        _setUserFriends(state: WritableDraft<InitialState>, action: PayloadAction<User[]>) {
            if (state.user) state.user.friends = action.payload
        },
        _deleteFriend(state: WritableDraft<InitialState>, action: PayloadAction<User>) {
            if (state.user && state.user.friends) {
                state.user.friends = state.user.friends.filter(friend => friend.login !== action.payload.login)
            }
        },
        _addUserToFriend(state: WritableDraft<InitialState>, action: PayloadAction<User>) {
            if (state.user && state.user.friends) {
                state.user.friends.push(action.payload)
            }
        }
    },
})

export const {_setUser, _deleteUser, _updateUser, _setUserFriends, _deleteFriend, _addUserToFriend} = _userSlice.actions
