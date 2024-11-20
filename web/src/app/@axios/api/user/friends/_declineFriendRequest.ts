import {FriendRequest} from "@/app/@redux/@types/user/friends/FriendRequest";
import {DeclineFriendRequestCallback} from "@/app/@axios/@types/callbacks/user/friends/DeclineFriendRequestCallback";
import {_api} from "@/app/@axios/axios";
import {AxiosError, AxiosResponse} from "axios";
import {HttpErrorResponse} from "@/app/@axios/@types/http/HttpErrorResponse";
import {HttpResponse} from "@/app/@axios/@types/http/HttpResponse";

export default async function _declineFriendRequest(friendRequest: FriendRequest, callback: DeclineFriendRequestCallback) {
    return await _api.web.delete("/api/user/friends/decline", {
        params: {
            id: friendRequest.id,
        }
    }).then((response: AxiosResponse) => {
        const result: HttpResponse<null> = response.data;
        callback.reduxCallback(friendRequest)
        callback.alertCallback(result.statusMessage, {severity: "success"});
    }).catch((error: AxiosError<HttpErrorResponse>) => {
        if (error.response) callback.alertCallback(error.response.data.statusMessage, {severity: "error"});
    })
}