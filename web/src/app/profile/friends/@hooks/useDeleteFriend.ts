import {User} from "@/app/@redux/@types/user/User";
import {_reduxCallback, useAppDispatch} from "@/app/@redux/_store";
import {_api} from "@/app/@axios/axios";
import useAppNotifications from "@/app/@hooks/useAppNotifications";

export default function useDeleteFriend(user: User) {

    const dispatch = useAppDispatch();
    const {show} = useAppNotifications()

    function handleDeleteFriend() {
        _api.requests.user.friends.deleteFriend(user, {
            alertCallback: show,
            reduxCallback: reduxCallback
        })
    }

    function reduxCallback() {
        dispatch(_reduxCallback.user.friends.deleteFriend(user))
    }

    return {handleDeleteFriend};
}