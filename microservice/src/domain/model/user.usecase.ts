import { User } from "./user.schema";

export interface UserUseCase {
    getUser: (email: string) => Promise<User>;
    createUser: (user: User) => Promise<User>;
    updateUser: (user: User) => Promise<User>;
    deleteUser: (email: string) => Promise<void | { statusCode: number; body: string }>;
}