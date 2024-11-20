import {AlertCallback} from "@/app/@axios/@types/callbacks/alert/AlertCallback";
import {User} from "@/app/@redux/@types/user/User";

export interface GetAllFriendsCallback extends AlertCallback {
    reduxCallback: (users: User[]) => void;
}