import { useNavigate } from "react-router-dom";
import { useBookingTimerStore } from "../../stores/bookingTimerStore";
import { useAppointmentWizardStore } from "../../stores/appointmentWizardStore";
import { useReleasePreAppointment } from "../../hooks/useReleasePreAppointment";

export const CancelBtn = () => {
  const navigate = useNavigate();
  const resetTimer = useBookingTimerStore((state) => state.resetTimer);
  const resetWizard = useAppointmentWizardStore((state) => state.reset);
  const { preAppointmentId } = useBookingTimerStore();
  const { mutateAsync: releasePreAppointment } = useReleasePreAppointment();
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          // Liberar la pre-cita si existe
          if (preAppointmentId) {
            await releasePreAppointment(`/Appointment/release-preappointment/${preAppointmentId}`);
          }
        } catch (error) {
          console.error("Error al liberar la pre-cita:", error);
        } finally {
          resetTimer();
          resetWizard();
          navigate("/dashboard/appointments");
        }
      }}
      className="mr-auto text-[#3466cc]  hover:text-[#343ecc] hover:underline  font-medium py-2 px-4 rounded-full hover:cursor-pointer duration-150"
    >
      Cancelar
    </button>
  );
};
