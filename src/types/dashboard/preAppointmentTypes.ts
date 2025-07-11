import type { InferOutput } from "valibot";
import type {
  CreatePreAppointmentSchema,
  ResponsePreAppointmentSchema,
} from "../../schemas/appointments/preAppointments";

export type CreatePreAppointmentType = InferOutput<
  typeof CreatePreAppointmentSchema
>;

export type ResponsePreAppointmentType = InferOutput<
  typeof ResponsePreAppointmentSchema
>;
