import { User } from "src/app/auth/interfaces/user";

export interface Physio {
    _id?: string;
    name: string;
    surname: string;
    email: string;
    specialty: string;
    licenseNumber: string;
    user?: User;
    me?: boolean;
}
