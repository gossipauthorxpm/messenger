export type Path = {
    path: string;
    name: string;
}

type Paths = {
    root: {
        vars: Path;
        profile: {
            vars: Path;
            userData: {
                vars: Path;
            };
            friends: {
                vars: Path;
            }
        },
        messenger: {
            vars: Path;
        }
    }
}

export const _paths: Paths = {
    root: {
        vars: {
            path: "/",
            name: "Root",
        },
        profile: {
            vars: {
                path: "/profile",
                name: "Profile",
            },
            userData: {
                vars: {
                    path: "/profile/user-data",
                    name: "ProfileUserData",
                }
            },
            friends: {
                vars: {
                    path: "/profile/friends",
                    name: "ProfileFriends",
                }
            }
        },
        messenger: {
            vars: {
                path: "/messenger",
                name: "Messenger",
            }
        }
    }
}
