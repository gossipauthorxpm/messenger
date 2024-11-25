import {useRouter} from "next/navigation";
import {Path} from "@/app/paths";

type NavigateParams = {
    callback: () => void
    path: Path
}

export default function useNavigate(params: NavigateParams) {
    const router = useRouter()

    const navigate = () => {
        if (typeof params.path.path === "string") {
            router.push(params.path.path)
        }
        params.callback()
    }

    return navigate
}