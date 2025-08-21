import { array, number, object, string, optional } from "valibot";

export const DependentSchema = object({
  documentNumber: string(),
  firstNames: string(),
  lastNames: string(),
});

export const AppointmentSchema = object({
  appointmentId: number(), 
  date: string(),
  time: string(),
  procedure: string(),
  procedureId: number(),
  office: string(),
  officeId: number(),
  address: string(),
  requirements: string(),
  status: string(),
  dependent: array(DependentSchema),
  appointmentFor: number(),
});

export const AppointmentsSchema = object({
  applicant: object({
    firstName: string(),
    lastName: string(),
    documentNumber: string(),
  }),
  appointments: array(AppointmentSchema),
});

export const postAppointmentSchema = object({
  documentNumber: string(),
  firstName: string(),
  lastName: string(),
});

export const postAppointmentDetailSchema = object({
  documentNumber: string(),
  firstName: string(),
  lastName: string(),
  appointmentId: number(),
});

export const AppointmentDetailResponseSchema = object({
  applicant: object({
    appointmentId: optional(string()),
    documentNumber: string(),
    firstName: string(),
    lastName: string(),
  }),
  appointments: array(AppointmentSchema),
});

// Integration with the API;
export const ResponseAppointmentsSchema = object({
  status: number(),
});

export const ReschedulingFormSchema = object({
  appointmentOldId: number(),
  availabilityBlockId: number(),
});
