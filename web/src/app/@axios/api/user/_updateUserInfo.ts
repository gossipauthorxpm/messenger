import {_web} from "@/app/@axios/axios";
import {UpdateUser} from "@/app/@redux/@types/user/UpdateUser";
import {AxiosError, AxiosResponse} from "axios";
import {HttpResponse} from "@/app/@axios/@types/http/HttpResponse";
import {HttpErrorResponse} from "@/app/@axios/@types/http/HttpErrorResponse";
import {UpdateCallback} from "@/app/@axios/@types/callbacks/user/UpdateCallback";

export async function _updateUserInfo(body: UpdateUser, callback: UpdateCallback) {
    return await _web.put("/api/user", body).then((result: AxiosResponse) => {
        const content: HttpResponse<null> = result.data
        callback.alertCallback(content.statusMessage, {severity: "success"})
        callback.reduxCallback(body)
    }).catch((error: AxiosError<HttpErrorResponse>) => {
        if (error.response)
            callback.alertCallback(error.response.data.statusMessage, {severity: "error"})
    })
}