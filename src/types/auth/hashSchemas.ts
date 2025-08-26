import type { InferInput, InferOutput } from "valibot";
import type {
  CreateHashSchema,
  CreateTokenSchema,
  ResponseCreateHashSchema,
  ResponseCreatesTokenSchema,
  ResponseCreateTokenSchema,
  PayloadDataSchema,
  JsonDataSchema,
  TokenApiSchema,
} from "../../schemas/Auth/hashSchemas";

export type CreateHashType = InferOutput<typeof CreateHashSchema>;
export type ResponseHashType = InferInput<typeof ResponseCreateHashSchema>;
export type CreateTokenType = InferOutput<typeof CreateTokenSchema>;
export type ResponseTokenType = InferInput<typeof ResponseCreateTokenSchema>;
export type ResponsesTokenType = InferInput<typeof ResponseCreatesTokenSchema>;

// Nuevos tipos para la estructura actualizada
export type PayloadDataType = InferInput<typeof PayloadDataSchema>;
export type JsonDataType = InferInput<typeof JsonDataSchema>;
export type TokenApiType = InferInput<typeof TokenApiSchema>;
