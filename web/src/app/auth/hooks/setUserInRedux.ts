import {_api} from "@/app/@axios/axios";
import {User} from "@/app/@redux/@types/user/User";
import {_reduxCallback, useAppDispatch, useAppSelector} from "@/app/@redux/_store";
import useAppNotifications from "@/app/@hooks/useAppNotifications";
import {useRouter} from "next/navigation";

// ! Sets user to redux state callback
export default function setUserInRedux() {
    const currentUser = useAppSelector(data => data.user.user)
    const dispatch = useAppDispatch()
    const {show} = useAppNotifications()
    const router = useRouter()
    // ! Send get request to server and sets to state user object
    const set = ()  => {
        if (!currentUser) {
            // TODO REFACTOR
            _api.requests.user.userInfo(show).then((user: User | null) => {
                if (user) dispatch(_reduxCallback.user.setUser(user))
                else return router.push("/auth")
            })
        }
    }

    return {set}
}