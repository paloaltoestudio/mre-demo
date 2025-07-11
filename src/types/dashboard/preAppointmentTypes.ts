import type { InferInput, InferOutput } from "valibot";
import type {
  CreatePreAppointmentSchema,
  ResponsePreAppointmentSchema,
} from "../../schemas/appointments/preAppointments";

export type CreatePreAppointmentType = InferOutput<
  typeof CreatePreAppointmentSchema
>;
export type ResponsePreAppointmentType = InferInput<
  typeof ResponsePreAppointmentSchema
>;
