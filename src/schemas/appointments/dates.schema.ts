import { array, date, object, string } from "valibot";

export const DatesSchema = array(
  object({
    date: date(),
    schedules: array(string()),
  })
);
