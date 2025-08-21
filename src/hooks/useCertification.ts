import { useState, useCallback } from 'react';
import { createCertification } from '../services/CertificationService';
import type { 
  CreateCertificationRequest, 
} from '../schemas/certifications/certification.schema';

interface UseCertificationReturn {
  isLoading: boolean;
  error: string | null;
  success: boolean;
  createCertification: (data: CreateCertificationRequest) => Promise<void>;
  resetState: () => void;
}

export const useCertification = (): UseCertificationReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createCertificationHandler = useCallback(async (data: CreateCertificationRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);

      const response = await createCertification(data);
      
      // Log response to avoid type issues
      console.log("API response:", response);
      
      if (response && typeof response === 'object' && 'status' in response) {
        const status = (response as any).status;
        if (status === 200 || status === 201) {
          setSuccess(true);
          console.log('Certificación creada exitosamente:', response);
        } else {
          const message = (response as any).message || 'Error al crear la certificación';
          throw new Error(message);
        }
      } else {
        throw new Error('Respuesta inválida de la API');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido al crear la certificación';
      setError(errorMessage);
      console.error('Error en useCertification:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetState = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setSuccess(false);
  }, []);

  return {
    isLoading,
    error,
    success,
    createCertification: createCertificationHandler,
    resetState,
  };
};
