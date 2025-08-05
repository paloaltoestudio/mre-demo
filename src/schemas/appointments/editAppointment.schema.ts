import { array, number, object, string } from "valibot";

export const EditAppointmentSchema = object({
  appointmentId: number(),
  dependents: array(
    object({
      relationshipTypeId: number(),
      documentTypeId: number(),
      documentNumber: string(),
      firstNames: string(),
      lastNames: string(),
    })
  ),
});

export const EditAppointmentResponseSchema = object({
  statusCode: number(),
  success: boolean(),
  message: string(),
  data: object({
    appointmentId: number(),
  }),
  errors: string().optional(),
}); 