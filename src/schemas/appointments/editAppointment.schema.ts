import { array, boolean, number, object, string, optional } from "valibot";

export const EditAppointmentSchema = object({
  appointmentId: number(),
  dependents: array(
    object({
      relationshipTypeId: number(),
      documentTypeId: number(),
      documentNumber: string(),
      firstNames: string(),
      lastNames: string(),
      documentoIdentidad: object({
        base64: string(),
        extension: string(),
      }),
      fotoFrontal: object({
        base64: string(),
        extension: string(),
      }),
      fotoPerfil: object({
        base64: string(),
        extension: string(),
      }),
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
  errors: optional(string()),
}); 