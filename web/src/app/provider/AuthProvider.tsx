"use client"

import React, {useEffect} from "react";
import getAuth from "@/app/auth/hooks/getAuth";
import {useAppSelector} from "@/app/@redux/_store";
import {User} from "@/app/@redux/@types/user/User";
import {Jwt} from "@/app/@redux/@types/Jwt";
import useUserSocket from "@/app/@sockets/useUserSocket";

type Props = {
    children: React.ReactNode
}

export default function AuthProvider(props: Props) {

    const currentUser: User | null = useAppSelector(data => data.user.user)
    const currentJwt: Jwt | null = useAppSelector(data => data.jwt.jwt)
    const {getUserData} = getAuth()
    const {connectSocket} = useUserSocket()

    useEffect(() => {
        getUserData()
        connectSocket()
    }, [currentJwt, currentUser])

    return <>
        {props.children}
    </>

}