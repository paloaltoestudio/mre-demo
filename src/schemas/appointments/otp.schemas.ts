import { object, string } from "valibot";

export const DataRequestOTPSchema = object({
  userId: string(),
});

export const ResponseDataRequestOTPSchema = object({
  message: string(),
  typeNotification: string(),
  otp: string(),
});
