import {User} from "@/app/@redux/@types/user/User";

export default function fetchSingleChatName(chatUsers: User[], currentUser: User | null) {
    let chatName: string = "SINGLE CHAT"
    chatUsers.forEach((user) => {
        if(currentUser && currentUser.login !== user.login) chatName = `${user.name} ${user.surname}`
    })
    return chatName
}