import { array, boolean, nullable, number, object, string } from "valibot";

export const ResponseDependentsSchema = object({
  statusCode: number(),
  success: boolean(),
  message: string(),
  data: array(
    object({
      id: number(),
      name: string(),
      description: string(),
    })
  ),
  errors: nullable(string()),
});
