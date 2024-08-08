
export interface CreateUser {
    name: string;
    email: string;
    password: string;
}


export interface UserServiceInterface {
    create(createFlight: CreateUser): Promise<boolean>;
}
