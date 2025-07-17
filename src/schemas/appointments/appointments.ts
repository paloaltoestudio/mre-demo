import { array, number, object, string } from "valibot";

export const DependentSchema = object({
  documentNumber: string(),
  firstNames: string(),
  lastNames: string(),
});

export const AppointmentSchema = object({
  id: number(), 
  date: string(),
  time: string(),
  procedure: string(),
  office: string(),
  address: string(),
  requirements: string(),
  status: string(),
  dependent: array(DependentSchema),
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

// Integration with the API;
export const ResponseAppointmentsSchema = object({
  status: number(),
});
