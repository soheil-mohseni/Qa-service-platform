export interface UpdateUser {
    affected: number  
}

export interface UpdateUserRequest {
    username: string
    newData: {
        username?: string
        password?: string
        group?:{
            name: string
        }
    }
}