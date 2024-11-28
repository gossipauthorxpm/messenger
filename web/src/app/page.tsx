"use client"

import * as React from 'react';
import {useRouter} from "next/navigation";
import {_paths} from "@/app/paths";
import useCurrentUser from "@/app/@hooks/useCurrentUser";
import {useEffect} from "react";
import assert from "node:assert";

export default function Home() {
    const router = useRouter();
    const currentUser = useCurrentUser();

    useEffect(() => {
        if (currentUser) {
            if (typeof _paths.root.messenger.vars.path === "string")
                router.push(_paths.root.messenger.vars.path)
        }
    }, [currentUser]);

    return <>

    </>
}
