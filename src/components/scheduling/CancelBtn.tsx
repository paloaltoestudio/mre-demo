import { useNavigate } from "react-router-dom";
import { useBookingTimerStore } from "../../stores/bookingTimerStore";
import { useAppointmentWizardStore } from "../../stores/appointmentWizardStore";

export const CancelBtn = () => {
  const navigate = useNavigate();
  const resetTimer = useBookingTimerStore((state) => state.resetTimer);
  const resetWizard = useAppointmentWizardStore((state) => state.reset);
  return (
    <button
      type="button"
      onClick={() => {
        resetTimer();
        resetWizard();
        navigate("/dashboard/appointments");
      }}
      className="mr-auto text-[#3466cc]  hover:text-[#343ecc] hover:underline  font-medium py-2 px-4 rounded-full hover:cursor-pointer duration-150"
    >
      Cancelar
    </button>
  );
};
