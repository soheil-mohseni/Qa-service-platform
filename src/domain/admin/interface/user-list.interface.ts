export interface UserList {
  username: string;
  group?: string | null;
}

export interface UserListResponse {
  users : UserList[]
}

