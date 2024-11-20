import {Jwt} from "@/app/@redux/@types/Jwt";
import {AlertCallback} from "@/app/@axios/@types/callbacks/alert/AlertCallback";

export interface AuthCallback extends AlertCallback{
    reduxCallback: (jwt: Jwt) => void
}