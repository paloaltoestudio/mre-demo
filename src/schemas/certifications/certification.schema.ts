import { object, string, number } from "valibot";

// Esquema para crear una certificación
export const CreateCertificationSchema = object({
  certificationType: string(),
  destinationEntity: string(),
  settledAmount: number(),
  consecutiveNumber: string(),
  userId: number(),
  nationality: string(),
});

// Esquema para la respuesta de la API
export const CertificationResponseSchema = object({
  status: number(),
  message: string(),
  data: object({
    id: number(),
    certificationType: string(),
    destinationEntity: string(),
    settledAmount: number(),
    consecutiveNumber: string(),
    userId: number(),
    nationality: string(),
    createdAt: string(),
    updatedAt: string(),
  }),
});

// Tipos derivados de los esquemas
export type CreateCertificationRequest = typeof CreateCertificationSchema.type;
export type CertificationResponse = typeof CertificationResponseSchema.type;
