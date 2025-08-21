import { postPublicRequest } from "./fetchingService";
import { 
  CreateCertificationSchema, 
  type CreateCertificationRequest,
  type CertificationResponse 
} from "../schemas/certifications/certification.schema";

/**
 * Crea una nueva certificación
 * @param certificationData - Datos de la certificación a crear
 * @returns Promise con la respuesta de la API
 */
export async function createCertification(
  certificationData: CreateCertificationRequest
): Promise<CertificationResponse> {
  try {
    const response = await postPublicRequest<CertificationResponse>({
      url: "/Certification/create",
      schema: CreateCertificationSchema,
      body: certificationData as unknown as object,
    });

    // Ensure we return the correct structure
    if (response && typeof response === 'object') {
      return response as CertificationResponse;
    } else {
      throw new Error('Invalid response format from API');
    }
  } catch (error) {
    console.error("Error creating certification:", error);
    throw error;
  }
}

/**
 * Obtiene el endpoint base para certificaciones
 * @returns URL base del endpoint
 */
export function getCertificationBaseUrl(): string {
  return "/api/Certification";
}
