import {useAppSelector} from "@/app/@redux/_store";
import useNotAcceptedFriendRequests from "@/app/@hooks/useNotAcceptedFriendRequests";
import {useNotReadMessages} from "@/app/@hooks/useNotReadMessages";

export default function useMenuBadgeContent() {

    const friendRequests = useNotAcceptedFriendRequests()
    const {fetchNotReadMessages} = useNotReadMessages()

    const newFriendsRequests = () => {
        if (friendRequests && friendRequests.length) {
            return friendRequests.length
        }
    }


    return {newFriendsRequests, fetchNotReadMessages};

}