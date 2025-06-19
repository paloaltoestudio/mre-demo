import { array, boolean, nullable, number, object, string } from "valibot";

export const OfficeSchema = object({
  id: number(),
  name: string(),
  cityId: number(), 
  cityName: string(),
});

export const OfficeDirectionSchema = object({
  id: number(),
  name: string(),
  cityId: number(), 
  cityName: string(),
  direction: string(),
});

export const OfficesInfoSchema = object({
  statusCode: number(),
  success: boolean(),
  message: string(),
  data: array(OfficeSchema),
  errors: nullable(array(string())),
});

export const OfficesDirectionInfoSchema = object({
  statusCode: number(),
  success: boolean(),
  message: string(),
  data: array(OfficeDirectionSchema),
  errors: nullable(array(string())),
});
