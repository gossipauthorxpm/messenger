import {_api} from "@/app/@axios/axios";
import {Chat} from "@/app/@redux/@types/chat/Chat";

export default async function _deleteGroupChat(chat: Chat) {
    return await _api.web.delete("/api/messenger/manager/groupChat/", {
        params: {
            idChat: chat.id,
        }
    }).then(response => {

    }).catch(error => {

    })
}