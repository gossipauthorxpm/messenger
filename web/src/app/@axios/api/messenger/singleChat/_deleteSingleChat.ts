import {_api} from "@/app/@axios/axios";
import {Chat} from "@/app/@redux/@types/chat/Chat";

export default async function _deleteSingleChat(chat: Chat): Promise<void> {
    return await _api.web.delete("/api/messenger/manager/chat/", {
        params: {
            idChat: chat.id,
        }
    }).then(response => {

    }).catch(error => {
        
    })
}