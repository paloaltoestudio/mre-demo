import type { InferInput } from "valibot";
import type { DatesSchema } from "../../schemas/appointments/dates.schema";

export type DatesType = InferInput<typeof DatesSchema>; 