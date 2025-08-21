import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { postPublicRequest } from "../services/fetchingService";
import { axiosInstance } from "../configs/axios";
import { postAppointmentDetailSchema, AppointmentDetailResponseSchema } from "../schemas/appointments/appointments";
import type { AppointmentType } from "../types/dashboard/AppointmentTypes";
import { useActiveUser } from "./useActiveUser";

export const useAppointmentDetail = (appointmentId: string | undefined) => {
  const { activeUser } = useActiveUser();

  const { data, isPending, error, mutateAsync } = useMutation({
    mutationFn: async (): Promise<{ applicant: any; appointments: AppointmentType[] }> => {
      console.log("Mutation function called with:", { appointmentId, activeUser });
      
      if (!appointmentId || !activeUser) {
        throw new Error("Appointment ID and active user are required");
      }

      const postData = {
        firstName: activeUser.firstName,
        lastName: activeUser.lastName,
        documentNumber: String(activeUser.documentNumber),
        appointmentId: parseInt(appointmentId),
      };

      console.log("Sending appointment detail request with data:", postData);
      console.log("Post data type:", typeof postData);
      console.log("Post data keys:", Object.keys(postData));

      // Usar axios directamente como en el componente que funciona
      const { data: responseData } = await axiosInstance.post("/Appointment/by-user", postData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Raw response from API:", responseData);
      
      // Extraer los datos del campo 'data' de la respuesta
      if (responseData.success && responseData.data) {
        return responseData.data;
      } else {
        throw new Error(`API returned error: ${responseData.message || 'Unknown error'}`);
      }
    },
    onSuccess: (data) => {
      console.log("Appointment detail loaded successfully:", data);
    },
    onError: (error: any) => {
      console.error("Error loading appointment detail:", error);
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
    },
  });

  // Función para cargar los datos
  const loadAppointmentDetail = useCallback(() => {
    if (appointmentId && activeUser) {
      mutateAsync();
    }
  }, [appointmentId, activeUser, mutateAsync]);

  return {
    data,
    isLoading: isPending,
    error,
    loadAppointmentDetail,
  };
};
