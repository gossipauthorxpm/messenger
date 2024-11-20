import {User} from "@/app/@redux/@types/user/User";

export interface FriendRequest {
    id: number;
    sender: User
    recipient: User
    message: string
    accepted: boolean
}