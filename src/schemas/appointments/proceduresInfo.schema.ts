import { array, object, string } from "valibot";

export const ProcedureSchema = object({
  id: string(),
  value: string(),
  label: string(),
  requeriments: array(string()),
});

export const ProceduresSchema = array(ProcedureSchema);

export const requerimentSchema = object({
  id: string(),
  value: string(),
  label: string(),
});

export const requerimentsSchema = array(requerimentSchema);
