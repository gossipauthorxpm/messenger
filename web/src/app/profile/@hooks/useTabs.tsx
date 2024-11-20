import React from "react";
import {usePathname, useRouter} from "next/navigation";
import useNamePath from "@/app/@hooks/useNamePath";
import {_paths} from "@/app/paths";

export default function useTabs() {

    const router = useRouter();
    const pathName = usePathname();

    const namePath = useNamePath(pathName,
        [
            _paths.root.profile.userData.vars,
            _paths.root.profile.friends.vars,
            _paths.root.profile.vars
        ]
    );

    const [value, setValue] = React.useState(namePath);

    const currentPage = () => {
        if(namePath === _paths.root.profile.vars.name) {
            setValue(_paths.root.profile.userData.vars.name)
            router.push(_paths.root.profile.userData.vars.path)
        }
        if(namePath === _paths.root.profile.userData.vars.name) {
            setValue(_paths.root.profile.userData.vars.name)
        }
    }

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return {value, handleChange, router, currentPage, namePath};

}