import {AxiosResponse} from "axios";
import {_api} from "@/app/@axios/axios";
import {HttpResponse} from "@/app/@axios/@types/http/HttpResponse";
import {AuthResponseContent} from "@/app/@axios/@types/auth/AuthResponseContent";
import {_cookies} from "@/app/@axios/_cookies";

export async function _refreshToken() {
    const refreshToken = _cookies.get("refreshToken")
    const serverResponse: AxiosResponse = await _api.web.post(`/api/auth/login/refresh/${refreshToken}`, {
    }, {
        headers: {"Authorization": undefined}
    })
    const response: HttpResponse<AuthResponseContent> = serverResponse.data;

    _cookies.set("authToken", response.content.authToken, {
        expires: 1000 * 60 * 24
    })
    return response.content.authToken
}