import { User } from "src/app/auth/interfaces/user";

export interface Patient {
    _id?: number;
    name: string;
    surname: string;
    birthDate: string;
    address: string;
    insuranceNumber: string;
    email: string;
    user?: User;
}
