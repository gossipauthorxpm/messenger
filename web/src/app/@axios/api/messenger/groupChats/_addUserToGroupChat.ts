import {_api} from "@/app/@axios/axios";
import {User} from "@/app/@redux/@types/user/User";
import {Chat} from "@/app/@redux/@types/chat/Chat";

export type AddUserToGroupChat = {
    user: User;
    chat: Chat;
}

export default async function _addUserToGroupChat(data: AddUserToGroupChat): Promise<void> {
    return await _api.web.post("/api/messenger/manager/groupChat/user", {}, {
        params: {
            idChat: data.chat.id,
            userLogin: data.user.login,
        }
    }).then(response => {

    }).catch(error => {
        
    })
}