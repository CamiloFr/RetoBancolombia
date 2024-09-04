export interface UserRequest {
    email: string;
    name: string;
    phone: string;
    country: string;
    city: string;
    password: string;
    type: string;
}

export interface UserResponse {
    email: string;
    name: string;
    phone: string;
    country: string;
    city: string;
    password: string;
    type: string;
    createdAt: string;
    updatedAt: string;
}