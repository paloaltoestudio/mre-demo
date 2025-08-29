import { useMutation } from "@tanstack/react-query";
import { postPublicRequest } from "../services/fetchingService";
import { CreatePreAppointmentSchema } from "../schemas/appointments/preAppointments";
import type { CreatePreAppointmentType, ResponsePreAppointmentType } from "../types/dashboard/preAppointmentTypes";
import { SessionStore } from "../stores/sessionStore";

export const useCreatePreAppointment = () => {
  return useMutation({
    mutationFn: (body: CreatePreAppointmentType) => {
      // Obtener el token global del store
      const globalToken = SessionStore.getState().globalToken;
      
      return postPublicRequest<ResponsePreAppointmentType>({
        url: `/Appointment/pre-appointment`,
        schema: CreatePreAppointmentSchema,
        body,
        auth: globalToken, // Pasar el token de autorización
      });
    },
  });
}; 