import { useEffect } from "react";
import { useBookingTimerStore } from "../stores/bookingTimerStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppointmentWizardStore } from "../stores/appointmentWizardStore";
import { useReleasePreAppointment } from "../hooks/useReleasePreAppointment";

export const BookingTimerExpirationHandler = () => {
  const { expiredByTimeout, isActive, timeLeft, clearExpiredFlag, preAppointmentId } = useBookingTimerStore();
  const navigate = useNavigate();
  const { setStep } = useAppointmentWizardStore();
  const { mutateAsync: releasePreAppointment } = useReleasePreAppointment();

  useEffect(() => {
    if (expiredByTimeout && !isActive && timeLeft === 0) {
      // Liberar la pre-cita si existe
      if (preAppointmentId) {
        releasePreAppointment(`/Appointment/release-preappointment/${preAppointmentId}`)
          .catch((error) => {
            console.error("Error al liberar la pre-cita:", error);
          });
      }

      toast.info("El tiempo de reserva ha caducado, debe seleccionar nuevamente un horario.", {
        autoClose: 3000,
      });
      clearExpiredFlag();
      setStep(3); // Forzar paso de selección de fecha/hora
      navigate("/schedulings/select-appointments");
    }
  }, [expiredByTimeout, isActive, timeLeft, navigate, clearExpiredFlag, setStep, preAppointmentId, releasePreAppointment]);

  return null;
}; 