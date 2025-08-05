export type DependentData = {
  relationshipTypeId: number;
  documentTypeId: number;
  documentNumber: string;
  firstNames: string;
  lastNames: string;
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