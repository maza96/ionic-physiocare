import { Appointment } from "./appointment";
import { Patient } from "./patient";

export interface Record {
    _id?: string;
    patient: Patient;
    medicalRecord?: string;
    appointments: Appointment[];
    me: boolean;
}
