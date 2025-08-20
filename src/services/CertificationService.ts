import { postPublicRequest } from "./fetchingService";
import { 
  CreateCertificationSchema, 
  CertificationResponseSchema,
  type CreateCertificationRequest,
  type CertificationResponse 
} from "../schemas/certifications/certification.schema";

export class CertificationService {
  /**
   * Crea una nueva certificación
   * @param certificationData - Datos de la certificación a crear
   * @returns Promise con la respuesta de la API
   */
  static async createCertification(
    certificationData: CreateCertificationRequest
  ): Promise<CertificationResponse> {
    try {
      const response = await postPublicRequest<CertificationResponse>({
        url: "/Certification/create",
        schema: CreateCertificationSchema,
        body: certificationData,
      });

      // Validar la respuesta
      const parsedResponse = CertificationResponseSchema.safeParse(response);
      if (!parsedResponse.success) {
        throw new Error(
          `Invalid response format: ${parsedResponse.issues
            .map((issue) => issue.message)
            .join(", ")}`
        );
      }

      return parsedResponse.output;
    } catch (error) {
      console.error("Error creating certification:", error);
      throw error;
    }
  }

  /**
   * Obtiene el endpoint base para certificaciones
   * @returns URL base del endpoint
   */
  static getBaseUrl(): string {
    return "/api/Certification";
  }
}
