import { boolean, number, object, string } from "valibot";

export const CreateOTPSchema = object({
  userId: string(),
  type: string(),
});

export const ResponseOTPSchema = object({
  statusCode: number(),
  success: boolean(),
  message: string(),
  data: object({
    message: string(),
    typeNotification: string(),
    otp: string(),
  }),
  errors: boolean(),
});
