import {_api} from "@/app/@axios/axios";
import {Message} from "@/app/@redux/@types/chat/Message";
import {ReadMessageCallback} from "@/app/@axios/@types/callbacks/messenger/ReadMessageCallback";
import {AxiosError, AxiosResponse} from "axios";
import {HttpErrorResponse} from "@/app/@axios/@types/http/HttpErrorResponse";
import {HttpResponse} from "@/app/@axios/@types/http/HttpResponse";

export default async function _readMessage(message: Message, callback: ReadMessageCallback): Promise<void> {
    return await _api.web.put("/api/messenger/read", {}, {
        params: {
            idMessage: message.id
        }
    }).then((response: AxiosResponse) => {
        const result: HttpResponse<null> = response.data
        callback.alertCallback(result.statusMessage, {severity: "success"})
        callback.reduxCallback(message)
    }).catch((error: AxiosError<HttpErrorResponse>) => {
        if (error.response) callback.alertCallback(error.response.data.statusMessage, {severity: "error"})
    })
}