import { Physio } from "src/app/physios/interfaces/physio";
import { Patient } from "./patient";
import { Appointment } from "./appointment";
import { Record } from "./record";

export interface PatientsResponse {
    result: Patient[];
}
export interface SinglePatientResponse {
    result: Patient;
}
export interface SinglePhysioResponse {
    result: Physio;
}
export interface PhysiosResponse {
    result: Physio[];
}
export interface AppointmentsResponse {
    result: Appointment[];
}
export interface SingleAppointmentResponse {
    result: Appointment;
}
export interface RecordsResponse {
    result: Record[];
}
export interface SingleRecordResponse {
    result: Record;
}