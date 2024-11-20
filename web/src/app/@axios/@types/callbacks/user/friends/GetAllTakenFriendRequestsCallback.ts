import {AlertCallback} from "@/app/@axios/@types/callbacks/alert/AlertCallback";
import {FriendRequest} from "@/app/@redux/@types/user/friends/FriendRequest";

export interface GetAllTakenFriendRequestsCallback extends AlertCallback {
    reduxCallback: (friendRequests: FriendRequest[]) => void
}