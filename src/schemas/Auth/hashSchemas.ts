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

// Esquema para el payload cuando isPayload es true (usuario ciudadano)
export const PayloadDataSchema = object({
  externalId: string(),
  token: string(),
  userType: string(),
  expiration: string(),
});

// Esquema para jsonData cuando isPayload es false (usuario funcionario)
export const JsonDataSchema = object({
  Data: object({
    USER_ID: string(),
    USER_TYPE: string(),
    USER_ID_FUNCIONARIO: string(),
    documentType: string(),
    documentNumber: string(),
    names: string(),
    lastName: string(),
    email: string(),
    ID_CASO: nullable(string()), // Campo opcional para funcionarios
  }),
});

// Esquema para el token de la API
export const TokenApiSchema = object({
  token_type: string(),
  access_token: string(),
  expires_in: string(),
});

// Esquema principal de respuesta del decrypt
export const ResponseCreateHashSchema = object({
  isPayload: boolean(),
  payload: nullable(PayloadDataSchema),
  jsonData: nullable(JsonDataSchema),
  token_api: TokenApiSchema,
});

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

// Esquema más flexible para debugging
export const ResponseCreateHashSchemaDebug = object({
  isPayload: boolean(),
  payload: nullable(PayloadDataSchema),
  jsonData: nullable(JsonDataSchema),
  token_api: TokenApiSchema,
});
