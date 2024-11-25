import {FriendRequest} from "@/app/@redux/@types/user/friends/FriendRequest";
import {_reduxCallback, useAppDispatch} from "@/app/@redux/_store";
import FriendRequestRow from "@/app/profile/friends/@components/FriendRequestRow";
import {Typography} from "@mui/material";
import useAppNotifications from "@/app/@hooks/useAppNotifications";
import {_api} from "@/app/@axios/axios";
import {SubmitHandler, useForm} from "react-hook-form";
import useNotAcceptedFriendRequests from "@/app/@hooks/useNotAcceptedFriendRequests";

type SendFriendRequest = {
    login: string;
    message: string;
}

export default function useFriendRequests() {

    const friendRequests = useNotAcceptedFriendRequests()

    const dispatch = useAppDispatch();
    const {show} = useAppNotifications()
    const {register, handleSubmit} = useForm<SendFriendRequest>()

    function fetchAllTakenFriendRequests() {
        _api.requests.user.friends.getAllTakenFriendsRequests({
            alertCallback: show,
            reduxCallback: (friendRequests: FriendRequest[]) => {
                dispatch(_reduxCallback.user.friends.setTakenFriendRequests(friendRequests))
            }
        })
    }

    const handleSubmitFriendRequest: SubmitHandler<SendFriendRequest> = (friendRequest: SendFriendRequest) => {
        _api.requests.user.friends.sendFriendRequest(friendRequest.login, "type\\type\\type", {
            alertCallback: show,
        })
    }

    function mapFriendRequests() {
        if (friendRequests && friendRequests.length > 0) {
            return friendRequests.map((friendRequest: FriendRequest, key: number) => {
                return <FriendRequestRow key={key} friendRequest={friendRequest}/>
            })
        } else return <Typography>Friends Request exists</Typography>;
    }

    return {
        mapFriendRequests, friendRequests, fetchAllTakenFriendRequests,
        form: {
            register, handleSubmit, onSubmit: handleSubmitFriendRequest
        }
    };

}