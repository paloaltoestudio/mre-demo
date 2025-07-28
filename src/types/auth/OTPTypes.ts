import type { InferInput, InferOutput } from "valibot";
import type {
  CreateOTPSchema,
  ResponseOTPSchema,
} from "../../schemas/Auth/OTPSchemas";

export type CreateOTPType = InferOutput<typeof CreateOTPSchema>;
export type ResponseOTPType = InferInput<typeof ResponseOTPSchema>;
