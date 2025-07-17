import type { InferInput, InferOutput } from "valibot";
import type {
  CancelDataAppointmentSchema,
  ResponseCancelAppointmentSchema,
} from "../../schemas/appointments/cancelAppointment.schema";

export type CancelDataAppointmentType = InferOutput<
  typeof CancelDataAppointmentSchema
>;
export type ResponseCancelAppointmentType = InferInput<
  typeof ResponseCancelAppointmentSchema
>;
