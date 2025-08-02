import { boolean, number, object, string } from "valibot";

export const CancelDataAppointmentSchema = object({
  appointmentId: number(),
});

export const ResponseCancelAppointmentSchema = object({
  success: boolean(),
  message: string(),
});
