export interface UpdateGroup {
    affected: number  
}

export interface UpdateGroupRequest {
    name: string
    newData: {
        name?: string
    }
}