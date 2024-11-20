"use client"

import React, {useEffect} from "react";
import useFriendRequests from "@/app/profile/friends/@hooks/useFriendRequests";
import useFriends from "@/app/profile/friends/@hooks/useFriends";

type Props = {
    children: React.ReactNode
}

export default function FetchProvider(props: Props) {

    const {getAllTakenFriendRequests} = useFriendRequests()
    const {getAllFriends} = useFriends()

    useEffect(() => {
        getAllFriends()
        getAllTakenFriendRequests()
    }, [])

    return <>
        {props.children}
    </>
}