import { Physio } from "src/app/physios/interfaces/physio";

export interface Appointment {
    _id?: string;
    date: string; 
    physio?: Physio;
    diagnosis: string;
    treatment: string;
    observations?: string;
}
