import type { InferInput } from "valibot";
import type {
  OfficeSchema, OfficesInfoSchema
} from "../../schemas/appointments/officeInfo.schema";

export type OfficesInfoType = InferInput<typeof OfficesInfoSchema>;
export type OfficeInfoType = InferInput<typeof OfficeSchema>;
