import { type Dispatch, type SetStateAction } from "react";
import { Modal } from "../Modal";
import type { Estado } from "../../types/dashboard/AppointmentTypes";
import {
  SchedulingsStore,
  type SchedulingStoreType,
} from "../../stores/schedulingsStore";
import { SessionStore, type UserType } from "../../stores/sessionStore";
import { estadoColor } from "../dashboard/Appointments";
import { AuthForm } from "../public/auth/AuthForm";
import { useNavigate } from "react-router-dom";

export type ReschedulingProps = {
  scheduled: SchedulingStoreType;
  toDelete: SchedulingStoreType;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  activeUser: UserType;
};

export const ReschedulingResume = ({
  scheduled,
  toDelete,
  isOpen,
  setIsOpen,
  activeUser,
}: ReschedulingProps) => {
  const { setToRemove, setToReplace } = SchedulingsStore();
  const { setLocationVerification } = SessionStore();
  const navigate = useNavigate();
  return (
    <AuthForm<Record<string, never>>
      onSubmit={() => {
        setToRemove(toDelete); 
        setToReplace(scheduled);
        setLocationVerification("Reagendar");
        navigate("/auth/verification-method");
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
                  estadoColor[scheduled.state as Estado]
                }`}
              >
                {scheduled.state}
              </span>
            </div>

            <p className="text-sm text-gray-800">
              Fecha:{" "}
              {`${
                scheduled.date
                  ? new Date(scheduled.date).toLocaleDateString("es-ES")
                  : ""
              }`}{" "}
              {scheduled?.hora}
            </p>
            <p className="text-sm text-gray-800">
              Oficina: {scheduled.consulate.consulate.name}
            </p>
            <p className="text-sm text-gray-800">
              Dirección: {scheduled.consulate.consulate.address}
            </p>
            <p className="text-sm text-gray-800">
              Código de confirmación: 23423
            </p>

            <div className="text-sm mt-3">
              <span className="font-semibold">Solicitantes:</span>
              <ul className="list-none pl-2 mt-2">
                {scheduled.parents?.map((s, idx) => (
                  <li key={idx}>
                    {s.names} {s.lastNames} - {s.typeDocument.value}{" "}
                    {s.document}
                  </li>
                ))}
                {scheduled.selectedOption !== "Para mis dependientes" && (
                  <li>
                    {activeUser?.firstName} {activeUser?.lastName} -{" "}
                    {activeUser?.documentType} {activeUser?.documentNumber}
                  </li>
                )}
              </ul>
            </div>

            <div className="text-sm mt-3">
              <span className="font-semibold">Tipo de trámite:</span>
              <ul className="list-none pl-2 mt-2">
                {scheduled.tramites?.map((s, idx) => (
                  <li key={idx}>{s.label}</li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end mt-3 gap-2">
              {scheduled.state === "Agendada" && (
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
