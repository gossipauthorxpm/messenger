import {Chat} from "@/app/@redux/@types/chat/Chat";
import {GetAllMessagesFromChat} from "@/app/@axios/@types/callbacks/messenger/GetAllMessagesFromChatCallback";
import {_api} from "@/app/@axios/axios";
import {AxiosError, AxiosResponse} from "axios";
import {HttpErrorResponse} from "@/app/@axios/@types/http/HttpErrorResponse";
import {HttpResponse} from "@/app/@axios/@types/http/HttpResponse";
import {Message} from "@/app/@redux/@types/chat/Message";

export default async function _getAllMessagesFromChat(chat: Chat, callback: GetAllMessagesFromChat) {
    return await _api.web.get(`/api/messenger/chats/${chat.id}`, {
        params: {
            typeChat: chat.isGroup ? "GROUP" : "SINGLE",
        }
    }).then((response: AxiosResponse) => {
        const result: HttpResponse<Message[]> = response.data;
        callback.reduxCallback({
            chat: chat,
            messages: result.content
        })
        callback.alertCallback(result.statusMessage, {severity: "success"})
    }).catch((error: AxiosError<HttpErrorResponse>) => {
        if (error.response) callback.alertCallback(error.response.data.statusMessage, {severity: "error"});
    })
}