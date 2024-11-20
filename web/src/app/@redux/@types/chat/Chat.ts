import {User} from "@/app/@redux/@types/user/User";
import {Message} from "@/app/@redux/@types/chat/Message";

export interface Chat {
    id: number;
    messages: Message[];
    usersChat: User[];
    creator: User | null;
    isGroup: boolean;
}