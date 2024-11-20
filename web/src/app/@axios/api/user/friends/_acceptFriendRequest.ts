import {FriendRequest} from "@/app/@redux/@types/user/friends/FriendRequest";
import {_api} from "@/app/@axios/axios";
import {AxiosError, AxiosResponse} from "axios";
import {HttpErrorResponse} from "@/app/@axios/@types/http/HttpErrorResponse";
import {AcceptFriendRequestCallback} from "@/app/@axios/@types/callbacks/user/friends/AcceptFriendRequestCallback";
import {HttpResponse} from "@/app/@axios/@types/http/HttpResponse";

export default async function _acceptFriendRequest(friendRequest: FriendRequest, callback: AcceptFriendRequestCallback) {
    return await _api.web.put("/api/user/friends/accept", {}, {
        params: {
            idFriendRequest: friendRequest.id,
        }
    }).then((response: AxiosResponse) => {
        const result: HttpResponse<null> = response.data;
        callback.reduxCallback(friendRequest)
        callback.alertCallback(result.statusMessage, {severity: "success"})
    }).catch((error: AxiosError<HttpErrorResponse>) => {
        if (error.response) callback.alertCallback(error.response.data.statusMessage, {severity: "error"});
    })
}