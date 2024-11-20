import {User} from "@/app/@redux/@types/user/User";
import {_api} from "@/app/@axios/axios";
import {AxiosError, AxiosResponse} from "axios";
import {HttpResponse} from "@/app/@axios/@types/http/HttpResponse";
import {GetAllFriendsCallback} from "@/app/@axios/@types/callbacks/user/friends/GetAllFriendsCallback";
import {HttpErrorResponse} from "@/app/@axios/@types/http/HttpErrorResponse";

export default async function _getAllFriendsCurrentUser(callback: GetAllFriendsCallback) {
    return await _api.web.get("/api/user/friends").then((response: AxiosResponse) => {
        const result: HttpResponse<User[]> = response.data;
        callback.reduxCallback(result.content);
        callback.alertCallback(result.statusMessage, {severity: "success"})
    }, (error: AxiosError<HttpErrorResponse>) => {
        if (error.response)
            callback.alertCallback(error.response.data.statusMessage, {severity: "success"})
    })
}