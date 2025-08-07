import { useNavigate } from "react-router-dom";
import { useBookingTimerStore } from "../../stores/bookingTimerStore";
import { useAppointmentWizardStore } from "../../stores/appointmentWizardStore";
import { useReleasePreAppointment } from "../../hooks/useReleasePreAppointment";
import { useTraceabilityLog } from "../../hooks/useTraceabilityLog";

export const CancelBtn = () => {
  const navigate = useNavigate();
  const resetTimer = useBookingTimerStore((state) => state.resetTimer);
  const resetWizard = useAppointmentWizardStore((state) => state.reset);
  const { preAppointmentId } = useBookingTimerStore();
  const { mutateAsync: releasePreAppointment } = useReleasePreAppointment();
  const { logTraceabilityEvent } = useTraceabilityLog();

  const handleCancel = async () => {
    try {
      // Liberar la pre-cita si existe
      if (preAppointmentId) {
        await releasePreAppointment(`/Appointment/release-preappointment/${preAppointmentId}`);
        
        // Log cuando se cancela el proceso
        logTraceabilityEvent({
          procedure: "agendamiento",
          procedureStatus: "cancelacion_proceso",
          modifiedFields: {
            preAppointmentId,
            action: "user_cancellation"
          },
          observations: "Usuario canceló el proceso de agendamiento"
        });
      }
    } catch (error) {
      console.error("Error al liberar la pre-cita:", error);
      
      // Log del error de cancelación
      logTraceabilityEvent({
        procedure: "agendamiento",
        procedureStatus: "error_cancelacion",
        modifiedFields: {
          preAppointmentId,
          error: error instanceof Error ? error.message : "Error desconocido"
        },
        observations: "Error al cancelar el proceso de agendamiento"
      });
    } finally {
      resetTimer();
      resetWizard();
      navigate("/dashboard/appointments");
    }
  };

  return (
    <button
      type="button"
      onClick={handleCancel}
      className="mr-auto text-[#3466cc]  hover:text-[#343ecc] hover:underline  font-medium py-2 px-4 rounded-full hover:cursor-pointer duration-150"
    >
      Cancelar
    </button>
  );
};
