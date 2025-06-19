import { array, boolean, nullable, number, object, string } from "valibot";

export const CountrySchema = object({
  id: number(),
  name: string(),
});

export const CountriesInfoSchema = object({
  statusCode: number(),
  success: boolean(),
  message: string(),
  data: array(CountrySchema),
  errors: nullable(array(string())),
});
