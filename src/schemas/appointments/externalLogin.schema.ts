import { object, string } from "valibot";

export const CreateExternalLoginSchema = object({
  username: string(),
  password: string(),
});

export const ResponseExternalLoginSchema = object({
  token: string(),
  createDate: string(),
  expiryDate: string(),
  expiryTime: string(),
});
