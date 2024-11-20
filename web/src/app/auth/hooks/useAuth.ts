import {SubmitHandler, useForm} from "react-hook-form";
import {AuthRequestType} from "@/app/@axios/@types/auth/AuthRequestType";
import {useRouter} from "next/navigation";
import {_api} from "@/app/@axios/axios";
import useAppNotifications from "@/app/@hooks/useAppNotifications";
import useJwt from "@/app/auth/hooks/useJwt";
import {AuthCallback} from "@/app/@axios/@types/callbacks/auth/AuthCallback";


export default function useAuth() {
    const router = useRouter()
    const {register, handleSubmit} = useForm<AuthRequestType>()
    const {show} = useAppNotifications()
    const {setJwt} = useJwt()

    // ! Auth in system !
    const onSubmit: SubmitHandler<AuthRequestType> = (data: AuthRequestType) => {
        _api.requests.auth.login(data, {
            reduxCallback: setJwt,
            alertCallback: show
        } as AuthCallback).then((isAuth: boolean) => {
            if (isAuth) {
                return router.push("/profile")
            }
        })
    }

    return {register, handleSubmit, onSubmit}

}