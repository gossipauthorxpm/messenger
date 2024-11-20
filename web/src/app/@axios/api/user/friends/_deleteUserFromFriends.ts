import {_api} from "@/app/@axios/axios";
import {DeleteFriendCallback} from "@/app/@axios/@types/callbacks/user/friends/DeleteFriendCallback";
import {AxiosError, AxiosResponse} from "axios";
import {HttpResponse} from "@/app/@axios/@types/http/HttpResponse";
import {HttpErrorResponse} from "@/app/@axios/@types/http/HttpErrorResponse";
import {User} from "@/app/@redux/@types/user/User";

export default async function _deleteUserFromFriends(user: User, callback: DeleteFriendCallback): Promise<void> {
    return await _api.web.delete("/api/user/friends", {
        params: {
            userLogin: user.login,
        }
    }).then((response: AxiosResponse) => {
        const result: HttpResponse<Object> = response.data;
        callback.reduxCallback(user)
        callback.alertCallback(result.statusMessage, {severity: "success"});
    }).catch((error: AxiosError<HttpErrorResponse>) => {
        if (error.response) callback.alertCallback(error.response.data.statusMessage, {severity: "error"});
    })
}