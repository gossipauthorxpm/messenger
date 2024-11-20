import {SubmitHandler, useForm} from "react-hook-form";
import {UpdateUser} from "@/app/@redux/@types/user/UpdateUser";
import {_reduxCallback, useAppDispatch} from "@/app/@redux/_store";
import {_api} from "@/app/@axios/axios";
import useAppNotifications from "@/app/@hooks/useAppNotifications";

export default function useUpdate() {
    const {register, handleSubmit} = useForm<UpdateUser>()
    const dispatch = useAppDispatch()
    const {show} = useAppNotifications()

    const reduxCallback = (body: UpdateUser) => {
        dispatch(_reduxCallback.user.updateUser(body))
    }

    const onSubmit: SubmitHandler<UpdateUser> = (data: UpdateUser) => {
        _api.requests.user.updateUser(data, {
            reduxCallback: reduxCallback,
            alertCallback: show
        })
    }

    return {register, handleSubmit, onSubmit}
}