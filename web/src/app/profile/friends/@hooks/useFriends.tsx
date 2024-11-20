import {_reduxCallback, useAppDispatch, useAppSelector} from "@/app/@redux/_store";
import useCurrentUser from "@/app/@hooks/useCurrentUser";
import {_api} from "@/app/@axios/axios";
import useAppNotifications from "@/app/@hooks/useAppNotifications";
import {User} from "@/app/@redux/@types/user/User";
import FriendRow from "@/app/profile/friends/@components/FriendRow";
import {Typography} from "@mui/material";
import React from "react";

export default function useFriends() {
    const dispatch = useAppDispatch();
    const {show} = useAppNotifications()
    const friends = useAppSelector(state => {
        if (state.user.user) return state.user.user.friends;
    });

    function fetchAllFriends() {
            _api.requests.user.friends.getAllFriendsCurrentUser({
                alertCallback: show,
                reduxCallback: users => {
                    dispatch(_reduxCallback.user.friends.setUserFriends(users));
                }
            })
    }

    function mapFriends() {
        if (friends && friends.length > 0) return friends.map((friend: User, key: number) => <FriendRow key={key} user={friend}/>)
        else return <Typography>Friends exists</Typography>
    }

    return {friends, fetchAllFriends, mapFriends};
}