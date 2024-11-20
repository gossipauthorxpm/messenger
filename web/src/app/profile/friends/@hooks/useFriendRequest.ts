import {_reduxCallback, useAppDispatch} from "@/app/@redux/_store";
import useAppNotifications from "@/app/@hooks/useAppNotifications";
import {FriendRequest} from "@/app/@redux/@types/user/friends/FriendRequest";
import {_api} from "@/app/@axios/axios";

export default function useFriendRequest(friendRequest: FriendRequest) {

    const dispatch = useAppDispatch();
    const {show} = useAppNotifications()

    function declineFriendRequest() {
        _api.requests.user.friends.declineFriendRequest(friendRequest, {
            alertCallback: show,
            reduxCallback: (friendRequest: FriendRequest) => {
                dispatch(_reduxCallback.user.friends.deleteFriendRequest(friendRequest));
            }
        })
    }

    function acceptFriendRequest() {
        _api.requests.user.friends.acceptFriendRequest(friendRequest, {
            alertCallback: show,
            reduxCallback: (friendRequest: FriendRequest) => {
                dispatch(_reduxCallback.user.friends.deleteFriendRequest(friendRequest));
                dispatch(_reduxCallback.user.friends.addUserToFriend(friendRequest.sender))
            }
        })
    }

    return {declineFriendRequest, acceptFriendRequest}
}