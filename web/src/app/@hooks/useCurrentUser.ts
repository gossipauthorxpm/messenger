import {useAppSelector} from "@/app/@redux/_store";

export default function useCurrentUser() {
    return useAppSelector(state => state.user.user)

}