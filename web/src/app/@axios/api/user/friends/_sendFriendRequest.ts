import {_api} from "@/app/@axios/axios";
import {AlertCallback} from "@/app/@axios/@types/callbacks/alert/AlertCallback";
import {AxiosError, AxiosResponse} from "axios";
import {HttpResponse} from "@/app/@axios/@types/http/HttpResponse";
import {HttpErrorResponse} from "@/app/@axios/@types/http/HttpErrorResponse";

export default async function _sendFriendRequest(userLogin: string, message: string, callback: AlertCallback) {
    return await _api.web.post("/api/user/friends", {}, {
        params: {
            login: userLogin,
            message: message,
        }
    }).then((response: AxiosResponse) => {
        const result: HttpResponse<null> = response.data;
        callback.alertCallback(result.statusMessage, {severity: 'success'});
    }).catch((error: AxiosError<HttpErrorResponse>) => {
        if (error.response) callback.alertCallback(error.response.data.statusMessage, {severity: "error"})
    })
}