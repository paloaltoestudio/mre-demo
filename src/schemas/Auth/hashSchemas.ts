import {
  date,
  object,
  string,
  number,
  boolean,
  nullable,
  array,
} from "valibot";

export const CreateHashSchema = object({
  hash: string(),
});

export const BaseResponseSchema = {
  statusCode: number(),
  success: boolean(),
  message: string(),
  errors: nullable(string()),
};

export const ResponseCreateHashSchema = object({
  externalId: string(),
  token: string(),
  userType: string(),
  expiracion: date(),
});

// export const ResponseCreateHashSchema = object({
// //   statusCode: number(),
// //   success: boolean(),
// //   message: string(),
// //   errors: nullable(string()),
//   data: HashDataSchema,
// });

export const CreateTokenSchema = object({
  externalId: string(),
});

export const ResponseCreateTokenSchema = object({
  id: number(),
  documentNumber: string(),
  firstName: string(),
  middleName: string(),
  lastName: string(),
  secondLastName: string(),
  email: string(),
  phone: string(),
  whatsapp: string(),
  officeId: number(),
  acceptsDataProcessing: boolean(),
  acceptsTermsAndConditions: boolean(),
  acceptanceDate: date(),
});

export const ResponseCreatesTokenSchema = array(ResponseCreateTokenSchema);
