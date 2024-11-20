export interface MessageUser {
    login: string
    email: string
    name: string
    surname: string
}

export interface Message {
    id: number;
    content: string;
    sender: MessageUser
    createdTime: string;
    read: boolean;
}