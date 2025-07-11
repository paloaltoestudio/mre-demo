import { array, number, object, string } from "valibot";

export const CreatePreAppointmentSchema = object({
  userId: number(),
  availabilityBlockId: number(),
  dependents: array(
    object({
      relationshipTypeId: number(),
      documentTypeId: number(),
      documentNumber: string(),
      firstNames: string(),
      lastNames: string(),
    })
  ),
  tramiteId: number(),
});

export const ResponsePreAppointmentSchema = object({
    appointmentId : number(), 
})
