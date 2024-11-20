import {configureStore} from "@reduxjs/toolkit";
import {
    _addUserToFriend,
    _deleteFriend,
    _deleteUser,
    _setUser,
    _setUserFriends,
    _updateUser,
    _userSlice
} from "@/app/@redux/slices/_userSlice";
import {useDispatch, useSelector} from "react-redux";
import {_jwtSlice, _logout, _setJwt} from "@/app/@redux/slices/_jwtSlice";
import {_deleteFriendRequest, _friendRequests, _setTakenFriendRequests} from "@/app/@redux/slices/_friendRequests";


export const _store = configureStore({
    reducer: {
        user: _userSlice.reducer,
        jwt: _jwtSlice.reducer,
        friendRequests: _friendRequests.reducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof _store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof _store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()


export const _reduxCallback = {
    user: {
        setUser: _setUser,
        deleteUser: _deleteUser,
        updateUser: _updateUser,
        friends: {
            setUserFriends: _setUserFriends,
            deleteFriend: _deleteFriend,
            setTakenFriendRequests: _setTakenFriendRequests,
            deleteFriendRequest: _deleteFriendRequest,
            addUserToFriend: _addUserToFriend,
        }

    },
    jwt: {
        setJwt: _setJwt,
        logout: _logout
    }
}