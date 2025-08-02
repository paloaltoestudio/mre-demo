import type { InferInput, InferOutput } from "valibot";
import type {
  CreateDateBlockSchema,
  ResponseDateBlockSchema,
} from "../../schemas/appointments/dateBlocks";

export type CreateDateBlocksType = InferOutput<typeof CreateDateBlockSchema>;
export type ResponseDateBlocksType = InferInput<typeof ResponseDateBlockSchema>;
