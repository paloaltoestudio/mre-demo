import type { InferInput, InferOutput } from "valibot";
import type {
  CreateHashSchema,
  ResponseCreateHashSchema,
} from "../../schemas/Auth/hashSchemas";

export type CreateHashType = InferOutput<typeof CreateHashSchema>;
export type ResponseHashType = InferInput<typeof ResponseCreateHashSchema>;
