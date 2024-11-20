import {_api} from "@/app/@axios/axios";
import {RegisterRequestType} from "@/app/@axios/@types/auth/RegisterRequestType";
import {HttpResponse} from "@/app/@axios/@types/http/HttpResponse";
import {RegisterCallback} from "@/app/@axios/@types/callbacks/auth/RegisterCallback";
import {AxiosError, AxiosResponse} from "axios";
import {HttpErrorResponse} from "@/app/@axios/@types/http/HttpErrorResponse";

export async function _register(body: RegisterRequestType, callback: RegisterCallback) {
    return await _api.web.post("/api/auth/register", body).then((result: AxiosResponse) => {
        const content: HttpResponse<any> = result.data
        callback.alertCallback(content.statusMessage, {severity: "success"})
        return result
    }).catch((error: AxiosError<HttpErrorResponse>) => {
        if(error.response){
            callback.alertCallback(error.response.data.statusMessage, {severity: "warning"})
        }
    })
}