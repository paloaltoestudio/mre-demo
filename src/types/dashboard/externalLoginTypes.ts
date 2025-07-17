import type { InferInput, InferOutput } from "valibot";
import type {
  CreateExternalLoginSchema,
  ResponseExternalLoginSchema,
} from "../../schemas/appointments/externalLogin.schema";

export type CreateExternalLoginType = InferOutput<
  typeof CreateExternalLoginSchema
>;
export type ResponseExternalLoginType = InferInput<
  typeof ResponseExternalLoginSchema
>;
