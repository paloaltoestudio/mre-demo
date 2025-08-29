import { useMutation } from "@tanstack/react-query";
import { postPublicRequest } from "../services/fetchingService";
import { object, number } from "valibot";

type ValidateAppointmentRequest = {
  idTramite: number;
  appointmentFor: number;
  idUsuario: number;
};

type ValidateAppointmentResponse = {
    hasActiveAppointments: boolean;
    resultado: string;
};

// Schema para validar el request
const validateAppointmentSchema = object({
  idTramite: number(),
  appointmentFor: number(),
  idUsuario: number(),
});

export const useValidateAppointment = () => {
  const { mutateAsync, isPending } = useMutation<
    ValidateAppointmentResponse,
    unknown,
    {
      url: string;
      schema: any;
      body: ValidateAppointmentRequest;
    }
  >({
    mutationFn: postPublicRequest<ValidateAppointmentResponse>,
  });

  const validateAppointment = async (
    idTramite: number,
    appointmentFor: number,
    idUsuario: number
  ): Promise<{ canContinue: boolean; reason: string }> => {
    try {
      const response = await mutateAsync({
        url: "/Appointment/validate-appointment",
        schema: validateAppointmentSchema,
        body: {
          idTramite,
          appointmentFor,
          idUsuario,
        },
      });

      console.log("Validation response:", response);
      
      // Verificar que la propiedad exists antes de usarla
      if (response.hasActiveAppointments === undefined) {
        console.warn("API no devolvió hasActiveAppointments, asumiendo que no hay citas activas");
        return { 
          canContinue: true, 
          reason: "No se pudo comprobar si tiene citas activas" 
        };
      }
      
      console.log("Has active appointments:", response.hasActiveAppointments);
      console.log("Result message:", response.resultado);

      if (response.hasActiveAppointments) {
        return { 
          canContinue: false, 
          reason: response.resultado || "Ya tienes una cita activa para este trámite" 
        };
      }

      return { 
        canContinue: true, 
        reason: "Validación exitosa" 
      };
    } catch (error) {
      console.error("Error validating appointment:", error);
      
      // Si es un error de Axios, loggear más detalles
      if (error && typeof error === 'object' && 'response' in error) {
        console.error("Response data:", (error as any).response?.data);
        console.error("Response status:", (error as any).response?.status);
      }
      
      // If there's an error, we assume validation passes to avoid blocking the user
      return { 
        canContinue: true, 
        reason: "Error en validación, permitiendo continuar" 
      };
    }
  };

  return { validateAppointment, isPending };
};
