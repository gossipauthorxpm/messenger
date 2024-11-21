import {_api} from "@/app/@axios/axios";

export default async function _createGroupChat(nameChat: string) {
    return await _api.web.post("/api/messenger/manager/groupChat/", {}, {
        params: {
            nameChat: nameChat
        }
    }).then(response => {

    }).catch(error => {
        
    })
}