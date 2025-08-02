import type { InferInput } from "valibot"
import type { ResponseDocumentTypesSchema } from "../../schemas/Auth/documentSchemas"

export type ResponseDocumentTypesType = InferInput<typeof ResponseDocumentTypesSchema>