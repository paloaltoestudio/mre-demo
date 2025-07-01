import type { InferInput } from "valibot";
import type {
  ProcedureSchema,
  ProceduresSchema,
  requerimentSchema,
  requerimentsSchema,
} from "../../schemas/appointments/proceduresInfo.schema";

export type ProcedureType = InferInput<typeof ProcedureSchema>;
export type ProceduresType = InferInput<typeof ProceduresSchema>;
export type requerimentType = InferInput<typeof requerimentSchema>;
export type requerimentsType = InferInput<typeof requerimentsSchema>;
