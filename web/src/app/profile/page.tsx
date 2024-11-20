"use client"

import {useRouter} from "next/navigation";
import {_paths} from "@/app/paths";

export default function Page() {
    const router = useRouter();
    return router.push(_paths.root.profile.userData.vars.path)
}