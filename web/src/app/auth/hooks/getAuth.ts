import setUserInRedux from "@/app/auth/hooks/setUserInRedux";
import {useRouter} from "next/navigation";
import useJwt from "@/app/auth/hooks/useJwt";


export default function getAuth() {

    const router = useRouter()
    const setUser = setUserInRedux()
    //! Function gets Auth tokens in all requests app
    const {jwt} = useJwt()
    //! if authToken not sets - user redirecting to auth page
    const getUserData = () => {
        if (jwt.authToken === null) return router.push("/auth")
        else setUser.set()
    }

    return {getUserData}

}