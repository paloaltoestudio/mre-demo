import { array, nullable, number, object, string, boolean as bool } from "valibot";

export const AvailabilityBlockSchema = object({
  date: string(),
  time: string(),
  availabilityId: number(),
  officeId: number(),
});

export const DatesResponseSchema = object({
  statusCode: number(),
  success: bool(),
  message: string(),
  data: array(AvailabilityBlockSchema),
  errors: nullable(array(string())),
});

export const outputDatesSchema = object({
  officeId: number(),
  proceduresId: array(number()),
});
