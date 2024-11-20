import {useRouter} from "next/navigation";

type NavigateParams = {
    callback: () => void
    path: string
}

export default function useNavigate(params: NavigateParams) {
    const router = useRouter()


    const navigate = () => {
        router.push(params.path)
        params.callback()
    }

    return navigate
}