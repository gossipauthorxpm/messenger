import {_api} from "@/app/@axios/axios";
import {User} from "@/app/@redux/@types/user/User";
import {Chat} from "@/app/@redux/@types/chat/Chat";
import {AddUserToGroupChat} from "@/app/@axios/api/messenger/groupChats/_addUserToGroupChat";

export interface DeleteUserFromGroupChat extends AddUserToGroupChat {
}

export default async function _deleteUserFromGroupChat(data: DeleteUserFromGroupChat): Promise<void> {
    return await _api.web.delete("/api/messenger/manager/groupChat/user", {
        params: {
            idChat: data.chat.id,
            userLogin: data.user.login,
        }
    }).then(response => {

    }).catch(error => {

    })
}