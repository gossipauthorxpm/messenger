export type User = {
    login: string
    email: string
    name: string
    surname: string
    thirdname: string
    phone: string
    createdTime: string
    friends?: User[]
}