import type { InferInput, InferOutput } from "valibot";
import type {
  CreateHashSchema,
  CreateTokenSchema,
  ResponseCreateHashSchema,
  ResponseCreatesTokenSchema,
  ResponseCreateTokenSchema,
} from "../../schemas/Auth/hashSchemas";

export type CreateHashType = InferOutput<typeof CreateHashSchema>;
export type ResponseHashType = InferInput<typeof ResponseCreateHashSchema>;
export type CreateTokenType = InferOutput<typeof CreateTokenSchema>;
export type ResponseTokenType = InferInput<typeof ResponseCreateTokenSchema>;
export type ResponsesTokenType = InferInput<typeof ResponseCreatesTokenSchema>;
