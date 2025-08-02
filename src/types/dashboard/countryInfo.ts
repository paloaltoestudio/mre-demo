import type { InferInput } from "valibot";
import type { CountriesInfoSchema, CountrySchema } from "../../schemas/appointments/countryInfo.schema";

export type CountriesInfoType = InferInput<typeof CountriesInfoSchema>;
export type CountryInfoType = InferInput<typeof CountrySchema>;
