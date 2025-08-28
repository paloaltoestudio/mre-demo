import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { parse } from "valibot";
import { axiosInstance } from "../configs/axios";
import { CancelDataAppointmentSchema } from "../schemas/appointments/cancelAppointment.schema";
import type { ResponseCancelAppointmentType } from "../types/dashboard/cancelAppointmentTypes";
import { useTraceabilityLog } from "./useTraceabilityLog";
import { useActiveUser } from "./useActiveUser";

export const useCancelAppointment = () => {
  const queryClient = useQueryClient();
  const { activeUser } = useActiveUser();
  const { logTraceabilityEvent } = useTraceabilityLog();
  


  return useMutation({
    mutationFn: async (appointmentId: number): Promise<ResponseCancelAppointmentType> => {
      console.log("🚀 [CANCEL_APPOINTMENT] Iniciando cancelación de cita:", appointmentId);
      
      // Validar datos antes de enviar
      const validatedData = parse(CancelDataAppointmentSchema, { appointmentId });
      console.log("✅ [CANCEL_APPOINTMENT] Datos validados:", validatedData);
      
      // Enviar petición de cancelación
      const response = await axiosInstance.put(`/Appointment/cancel-appointment/${appointmentId}`, {}, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      console.log("✅ [CANCEL_APPOINTMENT] Respuesta exitosa:", response.data);
      return response.data;
    },
    onSuccess: async (data, appointmentId) => {
      console.log("🎉 [CANCEL_APPOINTMENT] Cita cancelada exitosamente:", data);
      
      // Log de trazabilidad
      if (activeUser) {
        logTraceabilityEvent({
          procedure: "agendamiento",
          procedureStatus: "cancelacion_exitosa",
          modifiedFields: {
            appointmentId,
            action: "user_cancellation",
            userInfo: {
              firstName: activeUser.firstName,
              lastName: activeUser.lastName,
              documentNumber: activeUser.documentNumber
            }
          },
          observations: `Usuario canceló cita ${appointmentId} desde el detalle`
        });
      }
      
      // Mostrar mensaje de éxito
      toast.success("Cita cancelada exitosamente", {
        icon: (
          <FontAwesomeIcon icon={faCircleCheck} className="text-green-500" />
        ),
        autoClose: 3000,
        draggable: true,
        progress: undefined,
        hideProgressBar: true,
        className: "border-l-5 border-green-500 bg-white text-black shadow-md",
      });
      
      // Invalidar queries relacionadas para refrescar datos
      await queryClient.invalidateQueries({ queryKey: ["appointments"] });
      await queryClient.invalidateQueries({ queryKey: ["appointmentDetail", appointmentId.toString()] });
    },
    onError: (error: any, appointmentId) => {
      console.error("💥 [CANCEL_APPOINTMENT] Error al cancelar la cita:", error);
      
      // Log de error de trazabilidad
      if (activeUser) {
        logTraceabilityEvent({
          procedure: "agendamiento",
          procedureStatus: "error_cancelacion",
          modifiedFields: {
            appointmentId,
            error: error.message || "Error desconocido",
            userInfo: {
              firstName: activeUser.firstName,
              lastName: activeUser.lastName,
              documentNumber: activeUser.documentNumber
            }
          },
          observations: `Error al cancelar cita ${appointmentId} desde el detalle`
        });
      }
      
      // Mostrar mensaje de error
      let errorMessage = "Error al cancelar la cita";
      
      if (error.response?.status === 400) {
        errorMessage = "No se puede cancelar esta cita. Verifica el estado actual.";
      } else if (error.response?.status === 404) {
        errorMessage = "Cita no encontrada.";
      } else if (error.response?.status === 500) {
        errorMessage = "Error del servidor. Intenta nuevamente.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage, {
        icon: (
          <FontAwesomeIcon icon={faCircleExclamation} className="text-red-500" />
        ),
        autoClose: 5000,
        draggable: true,
        progress: undefined,
        hideProgressBar: true,
        className: "border-l-5 border-red-500 bg-white text-black shadow-md",
      });
    },
  });
};
