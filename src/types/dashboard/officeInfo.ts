import type { InferInput } from "valibot";
import type {
  OfficeSchema, OfficesInfoSchema
} from "../../schemas/appointments/OfficeInfo.schema";

export type OfficesInfoType = InferInput<typeof OfficesInfoSchema>;
export type OfficeInfoType = InferInput<typeof OfficeSchema>;
