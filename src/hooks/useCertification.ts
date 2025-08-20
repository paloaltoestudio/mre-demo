import { useState, useCallback } from 'react';
import { CertificationService } from '../services/CertificationService';
import type { 
  CreateCertificationRequest, 
  CertificationResponse,
  CertificationFormData 
} from '../types/certifications/certificationTypes';

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

  const createCertification = useCallback(async (data: CreateCertificationRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);

      const response: CertificationResponse = await CertificationService.createCertification(data);
      
      if (response.status === 200 || response.status === 201) {
        setSuccess(true);
        console.log('Certificación creada exitosamente:', response.data);
      } else {
        throw new Error(response.message || 'Error al crear la certificación');
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
    createCertification,
    resetState,
  };
};
