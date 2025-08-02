import type { InferInput, InferOutput } from "valibot";
import type {
  DataRequestOTPSchema,
  ResponseDataRequestOTPSchema,
} from "../../schemas/appointments/otp.schemas";

export type DataRequestOTPType = InferOutput<typeof DataRequestOTPSchema>;
export type ResponseDataRequestOTPType = InferInput<
  typeof ResponseDataRequestOTPSchema
>;
