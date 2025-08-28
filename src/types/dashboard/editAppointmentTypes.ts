export type DependentDocument = {
  base64: string;
  extension: string;
};

export type DependentData = {
  relationshipTypeId: number;
  documentTypeId: number;
  documentNumber: string;
  firstNames: string;
  lastNames: string;
  documentoIdentidad: DependentDocument;
  fotoFrontal: DependentDocument;
  fotoPerfil: DependentDocument;
};

export type EditAppointmentRequest = {
  appointmentId: number;
  dependents: DependentData[];
};

export type EditAppointmentResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    appointmentId: number;
  };
  errors?: string;
}; 