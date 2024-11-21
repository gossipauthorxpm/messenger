import {_api} from "@/app/@axios/axios";
import {User} from "@/app/@redux/@types/user/User";

export default async function _createSingleChat(receiverUser: User) {
    return await _api.web.post("/api/messenger/manager/chat/", {}, {
        params: {
            receiverLogin: receiverUser.login
        }
    }).then(response => {

    }).catch(error => {

    })
}