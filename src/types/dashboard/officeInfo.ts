import type { InferInput } from "valibot";
import type {
  OfficeDirectionSchema,
  OfficeSchema,
  OfficesDirectionInfoSchema,
  OfficesInfoSchema,
} from "../../schemas/appointments/officeInfo.schema";

export type OfficesInfoType = InferInput<typeof OfficesInfoSchema>;
export type OfficeInfoType = InferInput<typeof OfficeSchema>;
export type OfficesDirectionInfoType = InferInput<typeof OfficesDirectionInfoSchema>;
export type OfficeDirectionInfoType = InferInput<typeof OfficeDirectionSchema>;
