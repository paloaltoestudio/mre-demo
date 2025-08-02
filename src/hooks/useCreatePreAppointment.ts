import { useMutation } from "@tanstack/react-query";
import { postPublicRequest } from "../services/fetchingService";
import { CreatePreAppointmentSchema } from "../schemas/appointments/preAppointments";
import type { CreatePreAppointmentType, ResponsePreAppointmentType } from "../types/dashboard/preAppointmentTypes";

export const useCreatePreAppointment = () => {
  return useMutation({
    mutationFn: (body: CreatePreAppointmentType) => {
      return postPublicRequest<ResponsePreAppointmentType>({
        url: `/Appointment/pre-appointment`,
        schema: CreatePreAppointmentSchema,
        body,
      });
    },
  });
}; 