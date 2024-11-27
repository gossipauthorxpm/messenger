import {_reduxCallback, useAppDispatch} from "@/app/@redux/_store";
import {closeUserClientSocket} from "@/app/@sockets/useUserSocket";

type LogoutParams = {
    callback: () => void
}

export default function useLogout(param: LogoutParams) {

    const dispatch = useAppDispatch()

    const logout = () => {
        dispatch(_reduxCallback.jwt.logout())
        dispatch(_reduxCallback.user.deleteUser())
        dispatch(_reduxCallback.sockets.closeSockets())
        closeUserClientSocket()
        param.callback()
    }

    return logout
}