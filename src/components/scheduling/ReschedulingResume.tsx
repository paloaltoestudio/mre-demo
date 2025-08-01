import { type Dispatch, type SetStateAction } from "react";
import { Modal } from "../Modal";
import type {
  AppointmentType,
  Estado,
} from "../../types/dashboard/AppointmentTypes";
import { SessionStore } from "../../stores/sessionStore";
import { estadoColor } from "../dashboard/Appointments";
import { AuthForm } from "../public/auth/AuthForm";
import { useNavigate } from "react-router-dom";
import type { ResponseTokenType } from "../../types/auth/hashSchemas";
import { SchedulingsStore } from "../../stores/schedulingsStore";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";

export type ReschedulingProps = {
  scheduled: AppointmentType;
  toDelete?: AppointmentType;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  activeUser: ResponseTokenType;
};

export const ReschedulingResume = ({
  scheduled,
  isOpen,
  setIsOpen,
  activeUser,
}: ReschedulingProps) => {
  const { setLocationVerification } = SessionStore();
  const { setReschedulings, toSavedDate, setRemoveSavedDate } = SchedulingsStore();
  const navigate = useNavigate();

  return (
    <AuthForm<Record<string, never>>
      onSubmit={async () => {
        if (toSavedDate) {
          const reschedulingData = {
            appointmentOldId: scheduled.appointmentId,
            availabilityBlockId: toSavedDate,
          };
          setReschedulings(reschedulingData);
          
          // Hacer el reagendamiento directamente sin OTP
          try {
            const token = localStorage.getItem('token');
            console.log('Token para reagendamiento:', token);
            console.log('Datos de reagendamiento:', reschedulingData);
            
            const response = await fetch(`${import.meta.env.VITE_API_URL}/Appointment/reschedule-appointment`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify(reschedulingData),
            });
            
            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);
            
            if (response.ok) {
              const responseData = await response.json();
              console.log('Respuesta exitosa:', responseData);
              toast.success("Cita reagendada correctamente", {
                icon: (
                  <FontAwesomeIcon icon={faCircleCheck} className="text-green-500" />
                ),
                autoClose: 3000,
                draggable: true,
                progress: undefined,
                hideProgressBar: true,
                className: "border-l-5 border-green-500 bg-white text-black shadow-md",
              });
              setRemoveSavedDate(); // Limpiar el estado
              // Navegar directamente a las citas después del éxito
              navigate("/dashboard/appointments?reload=true");
            } else {
              const errorData = await response.json();
              console.error('Error en reagendamiento:', errorData);
              toast.error("Error al reagendar la cita", {
                icon: (
                  <FontAwesomeIcon
                    icon={faCircleExclamation}
                    className="text-red-500"
                  />
                ),
                autoClose: 3000,
                draggable: true,
                progress: undefined,
                hideProgressBar: true,
                className: "border-l-5 border-red-500 bg-white text-black shadow-md",
              });
            }
          } catch (error) {
            console.error('Error en reagendamiento:', error);
            toast.error("Error al reagendar la cita", {
              icon: (
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  className="text-red-500"
                />
              ),
              autoClose: 3000,
              draggable: true,
              progress: undefined,
              hideProgressBar: true,
              className: "border-l-5 border-red-500 bg-white text-black shadow-md",
            });
          }
        }
      }}
    >
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        content={
          <form className="w-[450px] bg-white border border-gray-100 rounded-lg shadow-lg p-6 flex flex-col gap-1">
            <div className="flex flex-row justify-between items-center">
              <h2 className="text-lg font-medium">Reagendar cita</h2>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  estadoColor[scheduled.status as Estado]
                }`}
              >
                {scheduled.status}
              </span>
            </div>

            <p className="text-sm text-gray-800">
              Fecha:{" "}
              {`${
                scheduled.date
                  ? new Date(scheduled.date).toLocaleDateString("es-ES")
                  : ""
              }`}{" "}
              {typeof scheduled?.time === 'string' ? scheduled.time : ''}
            </p>
            <p className="text-sm text-gray-800">Oficina: {scheduled.office}</p>
            <p className="text-sm text-gray-800">
              Dirección: {scheduled.address}
            </p>
            {/* <p className="text-sm text-gray-800">
              Código de confirmación: 23423
            </p> */}

            <div className="text-sm mt-3">
              <span className="font-semibold">Solicitantes:</span>
              <ul className="list-none pl-2 mt-2">
                {scheduled.dependent?.map((s, idx) => (
                  <li key={idx}>
                    {s.firstNames} {s.lastNames} - {s.documentNumber}
                  </li>
                ))}
                <li>
                  {activeUser?.firstName} {activeUser?.lastName} -{" "}
                  {activeUser?.documentNumber}
                </li>
                {/* {scheduled.selectedOption !== "Para mis dependientes" && (
                )} */}
              </ul>
            </div>

            <div className="text-sm mt-3">
              <span className="font-semibold">Tipo de trámite:</span>
              {scheduled.procedure}
            </div>

            <div className="flex justify-end mt-3 gap-2">
              {scheduled.status === "Agendada" && (
                <>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="text-blue-600 font-medium hover:cursor-pointer hover:bg-gray-400 hover:border-gray-200 duration-150 hover:text-white text-sm p-1 border-1 border-blue-600 rounded-full min-w-[100px]"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="text-white font-medium hover:cursor-pointer hover:bg- text-sm p-1 duration-150 hover:bg-blue-700 border-1 border-blue-600  bg-blue-600 rounded-full min-w-[100px]"
                  >
                    Reagendar
                  </button>
                </>
              )}
            </div>
          </form>
        }
      />
    </AuthForm>
  );
};
