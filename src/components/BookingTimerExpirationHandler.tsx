import { useEffect, useRef } from "react";
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
  
  // Usar useRef para evitar múltiples ejecuciones
  const hasProcessedTimeout = useRef(false);

  useEffect(() => {
    // Solo procesar si:
    // 1. El timer ha expirado por timeout
    // 2. No está activo
    // 3. El tiempo es 0
    // 4. No se ha procesado antes
    if (expiredByTimeout && !isActive && timeLeft === 0 && !hasProcessedTimeout.current) {
      console.log("⏰ [TIMER] Timer expirado, procesando timeout (primera vez)");
      
      // Marcar como procesado inmediatamente para evitar múltiples ejecuciones
      hasProcessedTimeout.current = true;
      
      const processTimeout = async () => {
        try {
          // Liberar la pre-cita si existe
          if (preAppointmentId) {
            console.log("⏰ [TIMER] Liberando pre-cita:", preAppointmentId);
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

        // Mostrar toast solo una vez
        console.log("⏰ [TIMER] Mostrando toast de timeout");
        toast.info("El tiempo de reserva ha caducado, debe seleccionar nuevamente un horario.", {
          autoClose: 3000,
        });
        
        // Limpiar estado y redirigir
        clearExpiredFlag();
        setStep(3); // Forzar paso de selección de fecha/hora
        navigate("/schedulings/select-appointments");
      };

      processTimeout();
    }
  }, [expiredByTimeout, isActive, timeLeft, clearExpiredFlag, setStep, navigate, preAppointmentId, releasePreAppointment, logTraceabilityEvent]);

  // Resetear el estado cuando el timer se reinicie
  useEffect(() => {
    if (!expiredByTimeout) {
      console.log("⏰ [TIMER] Timer reseteado, limpiando estado de procesamiento");
      hasProcessedTimeout.current = false;
    }
  }, [expiredByTimeout]);

  return null;
}; 