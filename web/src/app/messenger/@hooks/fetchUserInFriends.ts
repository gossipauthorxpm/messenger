import {User} from "@/app/@redux/@types/user/User";

export default function fetchUserInFriends(friends: User[] | undefined, user: User | undefined): User | undefined {
    if (!user || !friends) return undefined;
    // console.log(friends, user);
    return friends.find(friend => friend.login === user.login)
}