import { useEffect } from "react";
import { useBookingTimerStore } from "../stores/bookingTimerStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppointmentWizardStore } from "../stores/appointmentWizardStore";
import { useReleasePreAppointment } from "../hooks/useReleasePreAppointment";
import { useTraceabilityLog } from "../hooks/useTraceabilityLog";

export const BookingTimerExpirationHandler = () => {
  const { expiredByTimeout, isActive, timeLeft, clearExpiredFlag, preAppointmentId } = useBookingTimerStore();
  const navigate = useNavigate();
  const { setStep } = useAppointmentWizardStore();
  const { mutateAsync: releasePreAppointment } = useReleasePreAppointment();
  const { logTraceabilityEvent } = useTraceabilityLog();

  useEffect(() => {
    if (expiredByTimeout && !isActive && timeLeft === 0) {
      const handleTimeout = async () => {
        try {
          // Liberar la pre-cita si existe
          if (preAppointmentId) {
            await releasePreAppointment(`/Appointment/release-preappointment/${preAppointmentId}`);
            
            // Log cuando se agota el timeout
            logTraceabilityEvent({
              procedure: "agendamiento",
              procedureStatus: "timeout_expirado",
              modifiedFields: {
                preAppointmentId,
                timeLeft,
                action: "timeout_expiration"
              },
              observations: "El tiempo de reserva ha caducado automáticamente"
            });
          }
        } catch (error) {
          console.error("Error al liberar la pre-cita:", error);
          
          // Log del error de timeout
          logTraceabilityEvent({
            procedure: "agendamiento",
            procedureStatus: "error_timeout",
            modifiedFields: {
              preAppointmentId,
              timeLeft,
              error: error instanceof Error ? error.message : "Error desconocido"
            },
            observations: "Error al liberar la pre-cita por timeout"
          });
        }

        toast.info("El tiempo de reserva ha caducado, debe seleccionar nuevamente un horario.", {
          autoClose: 3000,
        });
        clearExpiredFlag();
        setStep(3); // Forzar paso de selección de fecha/hora
        navigate("/schedulings/select-appointments");
      };

      handleTimeout();
    }
  }, [expiredByTimeout, isActive, timeLeft, navigate, clearExpiredFlag, setStep, preAppointmentId, releasePreAppointment, logTraceabilityEvent]);

  return null;
}; 