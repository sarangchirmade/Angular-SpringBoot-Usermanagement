export interface User {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    userPassword: string;
    phone: number;
    role: Role;
}

export interface Role {
    id: number;
    name: string;
    roleid: number;
}