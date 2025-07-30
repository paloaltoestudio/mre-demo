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
  const { setReschedulings, toSavedDate } = SchedulingsStore();
  const navigate = useNavigate();

  return (
    <AuthForm<Record<string, never>>
      onSubmit={() => {
        // Map SchedulingStoreType to AppointmentType
        // const appointmentToRemove = {
        //   appointmentId: 0, // TODO: Replace with real ID if available
        //   date:
        //     toDelete.date instanceof Date
        //       ? toDelete.date.toISOString()
        //       : String(toDelete.date),
        //   time: toDelete.hora ?? "",
        //   procedure: toDelete.tramites?.name ?? "",
        //   office: toDelete.consulate?.name ?? "",
        //   address: toDelete.consulate?.address ?? "",
        //   requirements: toDelete.tramites?.requirements ?? "",
        //   status: toDelete.state ?? "",
        //   dependent: [], // Map dependents if available
        // };
        // setToRemove(appointmentToRemove);
        // setToReplace(scheduled);
        if (toSavedDate) {
          const reschedulingData = {
            appointmentOldId: scheduled.appointmentId,
            availabilityBlockId: toSavedDate,
          };
          setReschedulings(reschedulingData);
          setLocationVerification("Reagendar");
          navigate("/auth/verification-method");
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
              {scheduled?.time}
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
