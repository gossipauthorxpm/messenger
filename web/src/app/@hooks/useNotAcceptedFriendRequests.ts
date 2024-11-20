import {useAppSelector} from "@/app/@redux/_store";

export default function useNotAcceptedFriendRequests() {
    return  useAppSelector(state => {
        if (state.friendRequests.friendRequests) {
            return state.friendRequests.friendRequests.filter(friendRequest => !friendRequest.accepted);
        }
    });
}