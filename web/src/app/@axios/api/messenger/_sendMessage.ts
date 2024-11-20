import {_api} from "@/app/@axios/axios";
import {Chat} from "@/app/@redux/@types/chat/Chat";
import {AxiosError, AxiosResponse} from "axios";
import {SendMessageCallback} from "@/app/@axios/@types/callbacks/messenger/SendMessageCallback";
import {HttpResponse} from "@/app/@axios/@types/http/HttpResponse";
import {HttpErrorResponse} from "@/app/@axios/@types/http/HttpErrorResponse";
import {Message} from "@/app/@redux/@types/chat/Message";

export default async function _sendMessageChat(object: { content: string, chat: Chat }, callback: SendMessageCallback) {
    return await _api.web.post(`/api/messenger/${object.chat.id}`, {
        content: object.content,
    }).then((response: AxiosResponse) => {
        const result: HttpResponse<Message> = response.data;
        callback.alertCallback(result.statusMessage, {severity: "success"});
        callback.reduxCallback({chat: object.chat, message: result.content})
    }).catch((error: AxiosError<HttpErrorResponse>) => {
        if (error.response) callback.alertCallback(error.response.data.statusMessage, {severity: "error"});
    })
}