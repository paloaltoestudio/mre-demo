import { date, object, string, nullable, optional } from "valibot";

export const CreateHashSchema = object({
  hash: string(),
});

export const ResponseCreateHashSchema = object({
  documentType: string(),
  documentNumber: string(),
  email: string(),
  token: nullable(optional(string())),
  expiracion: nullable(optional(date())),
});
