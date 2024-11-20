import {_reduxCallback, useAppDispatch} from "@/app/@redux/_store";

type LogoutParams = {
    callback: () => void
}

export default function useLogout(param: LogoutParams) {

    const dispatch = useAppDispatch()

    const logout = () => {
        dispatch(_reduxCallback.jwt.logout())
        dispatch(_reduxCallback.user.deleteUser())
        param.callback()
    }

    return logout
}