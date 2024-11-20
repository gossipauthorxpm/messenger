import {useRouter} from "next/navigation";
import {SubmitHandler, useForm} from "react-hook-form";
import {AuthRequestType} from "@/app/@axios/@types/auth/AuthRequestType";
import {RegisterRequestType} from "@/app/@axios/@types/auth/RegisterRequestType";
import {_api} from "@/app/@axios/axios";
import useAppNotifications from "@/app/@hooks/useAppNotifications";

export default function useRegister() {
    const router = useRouter()
    const {register, handleSubmit, formState: {errors}} = useForm<RegisterRequestType>()
    const {show} = useAppNotifications()

    // ! Auth in system !
    const onSubmit: SubmitHandler<RegisterRequestType> = (data: RegisterRequestType) => {

        _api.requests.auth.register(data, {alertCallback: show}).then(result => {

        })
    }

    return {register, handleSubmit, onSubmit, errors}

}