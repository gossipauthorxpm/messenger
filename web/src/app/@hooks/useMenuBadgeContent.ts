import {useAppSelector} from "@/app/@redux/_store";
import useNotAcceptedFriendRequests from "@/app/@hooks/useNotAcceptedFriendRequests";

export default function useMenuBadgeContent() {

    const friendRequests = useNotAcceptedFriendRequests()

    const newFriendsRequests = () => {
        if (friendRequests && friendRequests.length) {
            return friendRequests.length
        }
    }
    return {newFriendsRequests};

}