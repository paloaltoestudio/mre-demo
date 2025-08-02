import type { InferInput } from "valibot";
import type {
  ProcedureResponseSchema,
  ProcedureSchema,
  ProceduresSchema,
  requerimentSchema,
  requerimentsSchema,
  unicProcedureResponseSchema,
} from "../../schemas/appointments/proceduresInfo.schema";

export type ProcedureType = InferInput<typeof ProcedureSchema>;
export type ProceduresType = InferInput<typeof ProceduresSchema>;
export type ProceduresResponseType = InferInput<typeof ProcedureResponseSchema>;
export type unicProceduresResponseType = InferInput<typeof unicProcedureResponseSchema>;
export type requerimentType = InferInput<typeof requerimentSchema>;
export type requerimentsType = InferInput<typeof requerimentsSchema>;
