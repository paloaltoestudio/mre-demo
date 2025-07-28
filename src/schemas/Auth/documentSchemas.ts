import { array, boolean, number, object, string } from "valibot";

export const ResponseDocumentTypesSchema = object({
  statusCode: number(),
  success: boolean(),
  message: string(),
  data: array(
    object({
      id: number(),
      code: string(),
      name: string(),
    })
  ),
  errors: boolean(),
});
