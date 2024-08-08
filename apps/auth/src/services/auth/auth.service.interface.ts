
export interface UserLogin {
  email: string;
  password: string;
}

export interface UserToken {
  userId: string;
  accessToken: string;
}

export interface AuthServiceInterface {

  validateToken(jwt: string): Promise<boolean>;

  login(user: UserLogin): Promise<UserToken | null>;
}