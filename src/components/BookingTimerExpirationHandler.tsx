import { useEffect } from "react";
import { useBookingTimerStore } from "../stores/bookingTimerStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppointmentWizardStore } from "../stores/appointmentWizardStore";

export const BookingTimerExpirationHandler = () => {
  const { expiredByTimeout, isActive, timeLeft, clearExpiredFlag } = useBookingTimerStore();
  const navigate = useNavigate();
  const { setStep } = useAppointmentWizardStore();

  useEffect(() => {
    if (expiredByTimeout && !isActive && timeLeft === 0) {
      toast.info("El tiempo de reserva ha caducado, debe seleccionar nuevamente un horario.", {
        autoClose: 3000,
      });
      clearExpiredFlag();
      setStep(3); // Forzar paso de selección de fecha/hora
      navigate("/schedulings/select-appointments");
    }
  }, [expiredByTimeout, isActive, timeLeft, navigate, clearExpiredFlag, setStep]);

  return null;
}; 