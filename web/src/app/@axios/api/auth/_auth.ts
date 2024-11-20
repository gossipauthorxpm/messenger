import {AuthRequestType} from "@/app/@axios/@types/auth/AuthRequestType";
import {AxiosError, AxiosResponse} from "axios";
import {AuthResponseContent} from "@/app/@axios/@types/auth/AuthResponseContent";
import {_api} from "@/app/@axios/axios";
import {_cookies} from "@/app/@axios/_cookies";
import {HttpErrorResponse} from "@/app/@axios/@types/http/HttpErrorResponse";
import {HttpResponse} from "@/app/@axios/@types/http/HttpResponse";
import {NotificationCallback} from "@/app/@axios/@types/callbacks/alert/NotificationCallback";
import {AuthCallback} from "@/app/@axios/@types/callbacks/auth/AuthCallback";


export async function _auth(data: AuthRequestType,
                            params: AuthCallback
) {
    return await _api.web.post("/api/auth/login", {
        password: data.password,
        username: data.login
    }).then((result: AxiosResponse) => {
        const content: HttpResponse<AuthResponseContent> = result.data
        _cookies.set("authToken", content.content.authToken, {
            expires: 1000 * 60 * 24
        })
        _cookies.set("refreshToken", content.content.refreshToken, {
            expires: 1000 * 60 * 60 * 24 * 7
        })
        // ! Send jwt to redux state
        params.reduxCallback({
            authToken: content.content.authToken,
            refreshToken: content.content.refreshToken
        })
        _api.web.defaults.headers.common["Authorization"] = result.data.authToken;
        params.alertCallback(content.statusMessage, {severity: "success"})
        return true;
    }).catch((error: AxiosError<HttpErrorResponse>) => {
        if(error.response){
            params.alertCallback(error.response.data.statusMessage, {severity: "warning"})
        }
        return false
    })
}

