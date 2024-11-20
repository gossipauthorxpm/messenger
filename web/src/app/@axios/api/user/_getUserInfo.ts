import {User} from "@/app/@redux/@types/user/User";
import {_api} from "@/app/@axios/axios";
import {AxiosError, AxiosResponse} from "axios";
import {HttpResponse} from "@/app/@axios/@types/http/HttpResponse";
import {NotificationCallback} from "@/app/@axios/@types/callbacks/alert/NotificationCallback";
import {HttpErrorResponse} from "@/app/@axios/@types/http/HttpErrorResponse";


export async function _getUserInfo(callback: NotificationCallback): Promise<User | null> {
    return await _api.web.get("api/user").then((result: AxiosResponse) => {
        const content: HttpResponse<User> = result.data
        callback(content.statusMessage, {severity: "success"})
        return content.content
    }).catch((error: AxiosError<HttpErrorResponse>) => {
        if (error.response) {
            callback(error.response.data.statusMessage, {severity: "error"})
        }
        return null;
    })
}