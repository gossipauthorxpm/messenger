import {AlertCallback} from "@/app/@axios/@types/callbacks/alert/AlertCallback";
import {UpdateUser} from "@/app/@redux/@types/user/UpdateUser";

export interface UpdateCallback extends AlertCallback {
    reduxCallback: (body: UpdateUser) => void
}