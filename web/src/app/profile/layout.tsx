"use client"

import React, {useEffect} from "react";
import {Stack, Tab, Tabs, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import useTabs from "@/app/profile/@hooks/useTabs";
import {_paths} from "@/app/paths";
import Loading from "@/app/@components/Loading";
import PeopleIcon from "@mui/icons-material/People";
import DataArrayIcon from "@mui/icons-material/DataArray";

export default function ProfileLayout({
                                          children, // will be a page or nested layout
                                      }: {
    children: React.ReactNode
}) {

    const {value, handleChange, router, currentPage, namePath} = useTabs()

    useEffect(() => {
        currentPage()
        console.log(namePath)
    }, [namePath]);

    if (namePath === _paths.root.profile.vars.name) return <Loading/>
    return (
        <>
            <Box sx={{width: 500}}>
                <Tabs
                    sx={{m: 2}}
                    value={value}
                    onChange={handleChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                >
                    <Tab onClick={() => router.push("/profile/user-data")}
                         value={_paths.root.profile.userData.vars.name}
                         label={
                             <Stack direction={"row"} spacing={1}>
                                 <DataArrayIcon/>
                                 <Typography>User data</Typography>
                             </Stack>
                         }
                    />
                    <Tab onClick={() => router.push("/profile/friends")}
                         value={_paths.root.profile.friends.vars.name}
                         label={
                             <Stack direction={"row"} spacing={1}>
                                 <PeopleIcon/>
                                 <Typography>Friends</Typography>
                             </Stack>
                         }
                    />
                </Tabs>
            </Box>
            {children}
        </>
    )
}