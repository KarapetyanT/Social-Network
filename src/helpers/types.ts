export interface IUser {
    id: number
    name: string
    surname: string
    login: string
    password: string
    cover: string
    picture: string
    followers: IUser[]
    following: IUser[]
    posts: IPost[]
    

}

export interface IAccount extends IUser {
    posts: IPost[]
    isPrivate: number
    connection: {
        followsMe: boolean
        following: boolean
        requested: boolean
    }
}

export interface IPost {
    id: number
    picture: string
    title: string
    likes: boolean
    likecount: number
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
    refetch: () => void
}

export interface IAccountContext{
    account:IAccount
    refetch: () => void

}

export interface IPassword {
    old: string
    newpwd: string
}

export interface ILogin {
    password: string
    login: string
}