"use client"

import React, {useEffect} from "react";
import useFriendRequests from "@/app/profile/friends/@hooks/useFriendRequests";
import useFriends from "@/app/profile/friends/@hooks/useFriends";
import useCurrentUser from "@/app/@hooks/useCurrentUser";
import useChats from "@/app/messenger/@hooks/useChats";
import {Jwt} from "@/app/@redux/@types/Jwt";
import {useAppSelector} from "@/app/@redux/_store";

type Props = {
    children: React.ReactNode
}

export default function FetchProvider(props: Props) {

    const {fetchAllTakenFriendRequests} = useFriendRequests()
    const {fetchAllFriends} = useFriends()
    const {fetchChats} = useChats()
    const currentJwt: Jwt | null = useAppSelector(data => data.jwt.jwt)

    useEffect(() => {
        fetchAllFriends()
        fetchAllTakenFriendRequests()
        fetchChats()
    }, [currentJwt])

    return <>
        {props.children}
    </>
}