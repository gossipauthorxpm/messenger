import {_api} from "@/app/@axios/axios";
import {AxiosError, AxiosResponse} from "axios";
import {HttpErrorResponse} from "@/app/@axios/@types/http/HttpErrorResponse";
import {HttpResponse} from "@/app/@axios/@types/http/HttpResponse";
import {Chat} from "@/app/@redux/@types/chat/Chat";

export default async function _getAllChats() {
    return await _api.web.get("/api/messenger/chat").then((response: AxiosResponse) => {
        const result: HttpResponse<Chat[]> = response.data;
        console.log(result);
    }).catch((error: AxiosError<HttpErrorResponse>) => {
        if (error.response) console.log(error.response);
    })
}