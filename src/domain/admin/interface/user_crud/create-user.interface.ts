export interface CreateUserResponse {
    token: string  
}

export interface CreateUserRequest {
    username: string;
    password: string;
  }