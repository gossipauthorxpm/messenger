export type User = {
    login: string
    email: string
    name: string
    surname: string
    thirdname: string
    phone: string
    isOnline: boolean
    active: UserActive
    createdTime: string
    friends?: User[]
}

export enum UserActive {
    WRITING, WAITING, SEARCHING
}