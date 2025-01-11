export interface IUser {
    id: number
    name: string
    surname: string
    login: string
    password: string
}

export interface IResponse {
    status: string
    message: string
    payload: unknown
    user?: IUser
}
export type IAuth = Pick<IUser, 'login' | 'password'>

export interface IContext {
    user: null | IUser
}

export interface IPassword {
    oldPassword: string
    newPassword: string
}

export interface ILogin {
    oldLogin: string
    newLogin: string
}