import type { InferInput } from "valibot";
import type { DateSchema, DatesResponseSchema, DatesSchema } from "../../schemas/appointments/dates.schema";

export type DatesType = InferInput<typeof DatesSchema>; 
export type DatesSchemaType = InferInput<typeof DatesResponseSchema>; 
export type DateSchemaType = InferInput<typeof DateSchema>; 