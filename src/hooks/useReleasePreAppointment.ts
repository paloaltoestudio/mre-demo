import { useMutation } from "@tanstack/react-query";
import { putPublicRequest, type PutPublicRequestProps } from "../services/fetchingService";

export const useReleasePreAppointment = () => {
  return useMutation({
    mutationFn: (url: string) => putPublicRequest<unknown>({ url }),
    onError: (error) => {
      console.error("Error al liberar la pre-cita:", error);
    },
  });
}; 