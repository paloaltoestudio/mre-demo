import { array, date, nullable, number, object, string } from "valibot";

export const DatesSchema = array(
  object({
    date: date(),
    schedules: array(string()),
  })
);

export const DateSchema = object({
  id: number(),
  officeId: number(),
  procedureId: number(),
  date: string(),
  time: string(),
});

export const DatesResponseSchema = object({
  statusCode: number(),
  success: string(),
  message: string(),
  data: array(DateSchema),
  errors: nullable(array(string())),
});

export const outputDatesSchema = object({
  officeId: number(),
  proceduresId: array(number()),
});
