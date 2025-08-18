import { usePublicQuery } from "./usePublicQuery";
import { AppointmentSchema } from "../schemas/appointments/appointments";
import type { AppointmentType } from "../types/dashboard/AppointmentTypes";

export const useAppointmentDetail = (appointmentId: string | undefined) => {
  const { data, isLoading, error } = usePublicQuery<AppointmentType>({
    key: ["appointment", appointmentId],
    url: `/appointments/${appointmentId}`,
    schema: AppointmentSchema,
    options: {
      enabled: !!appointmentId,
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  });

  return {
    data,
    isLoading,
    error,
  };
};
