"use client"

import {useAppSelector} from "@/app/@redux/_store";
import Button from "@mui/material/Button";
import React from "react";
import {useRouter} from "next/navigation";
import AccountMenu from "@/app/@components/topPanel/AccountMenu";


export default function AccountButton() {
    const router = useRouter();
    const selectedUser = useAppSelector(data => data.user.user)

    if (selectedUser) {
        return <AccountMenu user={selectedUser}/>
    }

    return <Button onClick={() => router.push("/auth")} color="inherit">Login</Button>

}