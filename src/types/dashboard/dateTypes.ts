import type { InferInput } from "valibot";
import type { AvailabilityBlockSchema, DatesResponseSchema } from "../../schemas/appointments/dates.schema";

export type DatesType = InferInput<typeof AvailabilityBlockSchema>[]; 
export type DatesSchemaType = InferInput<typeof DatesResponseSchema>; 
export type DateSchemaType = InferInput<typeof AvailabilityBlockSchema>; 