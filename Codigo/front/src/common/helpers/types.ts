export type User = {
    id : number | null,
    name : string | null,
    email : string | null,
    password : string | null,
}

export type UserLogin = {
    email : string | null,
    password : string | null,
}

export type UserToken = {
    email: string | null,
    token: string | null
}

export type Message = {
    title: string,
    message: string
}