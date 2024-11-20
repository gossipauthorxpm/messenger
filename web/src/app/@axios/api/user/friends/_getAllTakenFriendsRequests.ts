import {_api} from "@/app/@axios/axios";
import {AxiosError, AxiosResponse} from "axios";
import {HttpErrorResponse} from "@/app/@axios/@types/http/HttpErrorResponse";
import {HttpResponse} from "@/app/@axios/@types/http/HttpResponse";
import {FriendRequest} from "@/app/@redux/@types/user/friends/FriendRequest";
import {
    GetAllTakenFriendRequestsCallback
} from "@/app/@axios/@types/callbacks/user/friends/GetAllTakenFriendRequestsCallback";

export default async function _getAllTakenFriendsRequests(callback: GetAllTakenFriendRequestsCallback) {
    await _api.web.get("/api/user/friends/taken").then((response: AxiosResponse) => {
        const result: HttpResponse<FriendRequest[]> = response.data;
        callback.reduxCallback(result.content)
        callback.alertCallback(result.statusMessage, {severity: "success"})
    }).catch((error: AxiosError<HttpErrorResponse>) => {
        if (error.response) callback.alertCallback(error.response.data.statusMessage, {severity: "error"})
    })
}