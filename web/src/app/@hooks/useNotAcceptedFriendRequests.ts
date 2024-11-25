import {useAppSelector} from "@/app/@redux/_store";
import {FriendRequest} from "@/app/@redux/@types/user/friends/FriendRequest";
import {useMemo} from "react";

export default function useNotAcceptedFriendRequests() {
    const friendsRequests: FriendRequest[] | null = useAppSelector(state => state.friendRequests.friendRequests);
    return useMemo(() => friendsRequests?.filter(friendRequest => !friendRequest.accepted), [friendsRequests]);
}