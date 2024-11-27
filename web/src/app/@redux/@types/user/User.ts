export type User = {
    login: string
    email: string
    name: string
    surname: string
    thirdname: string
    phone: string
    isOnline: boolean
    createdTime: string
    friends?: User[]
}