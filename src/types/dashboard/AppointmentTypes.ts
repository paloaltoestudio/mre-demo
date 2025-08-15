import type { InferInput } from "valibot";
import type {
  AppointmentSchema,
  AppointmentsSchema,
  ResponseAppointmentsSchema,
} from "../../schemas/appointments/appointments";

export type Estado = "Agendada" | "Cancelada" | "Atendida" | "Pendiente";

export type Appointment = {
  id: number;
  estado: Estado;
  fecha: string;
  lugar: string;
  direccion: string;
  codigo: string;
  appointmentFor: number;
  solicitantes: string[];
};

export type ConsulatesType = {
  id: number;
  name: string;
  cityId: number;
  cityName: string;
  address: string;
};

export type AppointmentsType = InferInput<typeof AppointmentsSchema>;
export type AppointmentType = InferInput<typeof AppointmentSchema>;
export type ResponsePutAppointmentType = InferInput<
  typeof ResponseAppointmentsSchema
>;
