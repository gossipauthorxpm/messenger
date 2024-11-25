import {_api} from "@/app/@axios/axios";
import {AxiosError, AxiosResponse} from "axios";
import {HttpErrorResponse} from "@/app/@axios/@types/http/HttpErrorResponse";
import {HttpResponse} from "@/app/@axios/@types/http/HttpResponse";
import {Chat} from "@/app/@redux/@types/chat/Chat";
import {GetAllChatsCallback} from "@/app/@axios/@types/callbacks/messenger/GetAllChatsCallback";

export default async function _getAllChats(callback: GetAllChatsCallback) {
    return await _api.web.get("/api/messenger/chats").then((response: AxiosResponse) => {
        const result: HttpResponse<Chat[]> = response.data;
        callback.alertCallback(result.statusMessage, {severity: "success"});
        callback.reduxCallback(result.content)
    }).catch((error: AxiosError<HttpErrorResponse>) => {
        if (error.response) callback.alertCallback(error.response.data.statusMessage, {severity: "error"});
        return error;
    })
}