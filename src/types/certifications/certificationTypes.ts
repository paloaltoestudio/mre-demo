// Tipos para el módulo de certificaciones

export interface CertificationData {
  id?: number;
  certificationType: string;
  destinationEntity: string;
  settledAmount: number;
  consecutiveNumber: string;
  userId: number;
  nationality: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCertificationRequest {
  certificationType: string;
  destinationEntity: string;
  settledAmount: number;
  consecutiveNumber: string;
  userId: number;
  nationality: string;
}

export interface CertificationResponse {
  status: number;
  message: string;
  data: CertificationData;
}

export interface CertificationFormData {
  certificationType: string;
  destinationEntity: string;
  settledAmount: number;
  consecutiveNumber: string;
  nationality: string;
}

// Tipos para el estado del formulario
export interface CertificationFormState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
  certificationData: CertificationFormData | null;
}

// Tipos para las opciones de certificación
export interface CertificationTypeOption {
  value: string;
  label: string;
  description?: string;
}

export interface DestinationEntityOption {
  value: string;
  label: string;
  country?: string;
}
