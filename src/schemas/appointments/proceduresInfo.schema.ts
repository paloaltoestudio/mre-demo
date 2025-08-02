import {
  array,
  boolean,
  nullable,
  number,
  object,
  pick,
  string,
} from "valibot";

export const ProcedureSchema = object({
  id: number(),
  name: string(),
  requirements: string(),
});

export const ProceduresSchema = array(ProcedureSchema);

export const ProcedureResponseSchema = object({
  statusCode: number(),
  success: boolean(),
  message: string(),
  data: ProceduresSchema,
  errors: nullable(array(string())),
});

export const unicProcedureResponseSchema = object({
  ...pick(ProcedureResponseSchema, [
    "statusCode",
    "success",
    "message",
    "errors",
  ]).entries,
  data: ProcedureSchema,
});

export const requerimentSchema = object({
  id: string(),
  value: string(),
  label: string(),
});

export const requerimentsSchema = array(requerimentSchema);
