import {_api} from "@/app/@axios/axios";
import {Chat} from "@/app/@redux/@types/chat/Chat";
import {Message} from "@/app/@redux/@types/chat/Message";

export interface DeleteMessageFromGroupChat {
    chat: Chat
    message: Message
}

export default async function _deleteMessageFromGroupChat(data: DeleteMessageFromGroupChat): Promise<void> {
    return await _api.web.delete("/api/messenger/manager/groupChat/message", {
        params: {
            idChat: data.chat.id,
            idMessage: data.message.id,
        }
    }).then(response => {

    }).catch(error => {

    })
}