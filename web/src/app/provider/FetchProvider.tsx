"use client"

import React, {useEffect} from "react";
import useFriendRequests from "@/app/profile/friends/@hooks/useFriendRequests";
import useFriends from "@/app/profile/friends/@hooks/useFriends";
import useCurrentUser from "@/app/@hooks/useCurrentUser";

type Props = {
    children: React.ReactNode
}

export default function FetchProvider(props: Props) {

    const currentUser = useCurrentUser();
    const {getAllTakenFriendRequests} = useFriendRequests()
    const {getAllFriends} = useFriends()

    useEffect(() => {
        if(currentUser) {
            getAllFriends()
            getAllTakenFriendRequests()
        }
    }, [currentUser])

    return <>
        {props.children}
    </>
}