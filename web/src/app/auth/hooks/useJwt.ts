import {_cookies} from "@/app/@axios/_cookies";
import {Jwt} from "@/app/@redux/@types/Jwt";
import {_reduxCallback, useAppDispatch, useAppSelector} from "@/app/@redux/_store";

export default function useJwt() {

    const dispatch = useAppDispatch()

    const authToken: string | null = _cookies.get("authToken")
    const refreshToken: string | null = _cookies.get("refreshToken")

    const jwt = {
        authToken: authToken,
        refreshToken: refreshToken
    } as Jwt

    function setJwt(jwt: Jwt) {
         dispatch(_reduxCallback.jwt.setJwt(jwt))
    }

    return {
        jwt, setJwt
    };

}