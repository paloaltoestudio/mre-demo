import { useNavigate } from "react-router-dom";
import type { Estado } from "../../types/dashboard/AppointmentTypes";
import { SessionStore, type UserType } from "../../stores/sessionStore";
import {
  SchedulingsStore,
  type SchedulingStoreType,
} from "../../stores/schedulingsStore";
import { useEffect, useState } from "react";
import { Rescheduling } from "../scheduling/Rescheduling";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { CancelAppointment } from "../scheduling/CancelAppointment";

const estadoColor: Record<Estado, string> = {
  Agendada: "bg-green-100 text-green-700",
  Cancelada: "bg-red-100 text-red-700",
  Atendida: "bg-gray-100 text-gray-700",
  Pendiente: "bg-yellow-100 text-yellow-700",
};

export const AppointmentCards = () => {
  const navigate = useNavigate();
  const { user, document } = SessionStore();
  const { scheduled, removeScheduled } = SchedulingsStore();
  const [activeUser, setActiveUser] = useState<UserType>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenCancel, setIsOpenCancel] = useState<boolean>(false);
  const [scheduledData, setScheduledData] = useState<SchedulingStoreType>();
  const [requestRemove, setRequestRemove] = useState<boolean>(false);
  const [showRequirementsMap, setShowRequirementsMap] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    const newUser = user.find(
      (user) => user.documentNumber.toString() === document.toString()
    );
    setActiveUser(newUser);
  }, []);

  const handleRemove = () => {
    console.log("handleRemove called")
    if (scheduledData && requestRemove) {
      removeScheduled(scheduledData);
      setIsOpenCancel(false);
      setRequestRemove(false);
      navigate("/dashboard/appointments");
    }
  };

  useEffect(() => {
    handleRemove();
  }, [requestRemove, scheduledData, removeScheduled]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Mis agendamientos</h2>

      {/* Card de información del solicitante */}
      <div className="bg-white border border-gray-100 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Información del solicitante</h3>
          <button
            type="button"
            onClick={() => navigate("/schedulings/select-appointments")}
            className="text-md text-white hover:cursor-pointer bg-[#3366cc] hover:bg-[#334acc] rounded-full p-4 font-medium"
          >
            + Nuevo agendamiento
          </button>
        </div>
        <p className="text-sm">
          <span className="font-semibold">Nombres y apellidos:</span>{" "}
          {activeUser?.firstName} {activeUser?.lastName}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Documento:</span>{" "}
          {activeUser?.documentNumber}
        </p>
      </div>

      {/* Cards de citas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {scheduled.map((appt, index) => (
          <div
            key={`${appt.date}${index}`}
            className="bg-white hover:bg-gray-100 border border-gray-100 rounded-lg shadow-lg p-6 flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <p className="text-sm">Fecha: {`${appt.date}`}</p>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  estadoColor[appt.state as Estado]
                }`}
              >
                {appt.state}
              </span>
            </div>
            <p className="text-sm">
              Trámite:{" "}
              {appt.tramites?.map((tramite) => tramite.label).join(", ")}
            </p>
            <p className="text-sm">
              Consulado: {appt.consulate.consulate.name}
            </p>
            <p className="text-sm">
              Dirección: {appt.consulate.consulate.address}
            </p>
            <p className="text-sm">Código de confirmación: 23423</p>

            <div className="text-sm mt-3">
              <span className="font-semibold">Solicitantes:</span>
              <ul className="list-none mt-1">
                {appt.parents?.map((s, idx) => (
                  <li key={idx}>
                    {s?.names} {s?.lastNames}. {s?.typeDocument.label }: {s?.document}
                  </li>
                ))}
                <li>
                  {activeUser?.firstName} {activeUser?.lastName}.{" "}
                  {activeUser?.documentType}: {activeUser?.documentNumber}
                </li>
              </ul>
            </div>

            {showRequirementsMap[appt.date.toString() + index] && (
              <div className="text-sm mt-3">
                <span className="font-semibold">Requisitos:</span>
                <ul className="list-none mt-1">
                  {appt.tramites.map((s, idx) => (
                    <li key={idx}>
                      {s.requeriments
                        ?.map((requirement) => requirement)
                        .join(", ")}
                    </li>
                  ))}
                  {/* <li>
                    {activeUser?.firstName} {activeUser?.lastName}
                  </li> */}
                </ul>
              </div>
            )}

            <div className="flex justify-end mt-3 gap-2">
              {appt.state === "Agendada" && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setShowRequirementsMap((prev) => ({
                        ...prev,
                        [appt.date.toString() + index]:
                          !prev[appt.date.toString() + index],
                      }))
                    }
                    className="text-blue-600 hover:underline text-sm font-medium mr-auto"
                  >
                    {showRequirementsMap[appt.date.toString() + index]
                      ? "Ocultar requisitos"
                      : "Ver requisitos"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpenCancel(true);
                      setScheduledData(appt);
                    }}
                    className="text-blue-600 text-sm p-[3px] border-1 border-blue-600 hover:bg-gray-400 hover:text-white font-medium rounded-full min-w-[100px] duration-150 hover:border-gray-400 hover:cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(true);
                      setScheduledData(appt);
                    }}
                    className="text-blue-600 text-sm py-[3px] px-3 border-1 border-blue-600 hover:bg-blue-700 hover:text-white font-medium rounded-full min-w-[100px] duration-150 hover:border-gray-400 hover:cursor-pointer"
                  >
                    <FontAwesomeIcon
                      icon={faCalendar}
                      className="text-blue-500 text-lg mr-2"
                    />
                    Reagendar
                  </button>
                </>
              )}
              {appt.state === "Cancelada" && (
                <button
                  type="button"
                  onClick={() => {
                    setIsOpenCancel(true);
                    setScheduledData(appt);
                  }}
                  className="text-blue-600 text-sm p-[3px] border-1 border-blue-600 hover:bg-gray-400 hover:text-white font-medium rounded-full min-w-[100px] duration-150 hover:border-gray-400 hover:cursor-pointer"
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-blue-600 text-sm py-[3px] px-3 border-1 border-blue-600 hover:bg-blue-700 hover:text-white font-medium rounded-full min-w-[100px] duration-150 hover:border-gray-400 hover:cursor-pointer"
                  />
                  Archivar
                </button>
              )}
              {appt.state === "Atendida" && (
                <button
                  type="button"
                  onClick={() => {
                    setIsOpenCancel(true);
                    setScheduledData(appt);
                  }}
                  className="text-blue-600 text-sm p-[3px] border-1 border-blue-600 hover:bg-gray-400 hover:text-white font-medium rounded-full min-w-[100px] duration-150 hover:border-gray-400 hover:cursor-pointer"
                >
                  Eliminar
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-blue-600 text-sm py-[3px] px-3 border-1 border-blue-600 hover:bg-blue-700 hover:text-white font-medium rounded-full min-w-[100px] duration-150 hover:border-gray-400 hover:cursor-pointer"
                  />
                </button>
              )}
              {appt.state === "Pendiente" && (
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(true);
                    setScheduledData(appt);
                  }}
                  className="text-blue-600 text-sm py-[3px] px-3 border-1 border-blue-600 hover:bg-blue-700 hover:text-white font-medium rounded-full min-w-[100px] duration-150 hover:border-gray-400 hover:cursor-pointer"
                >
                  <FontAwesomeIcon
                    icon={faCalendar}
                    className="text-blue-500 text-lg mr-2"
                  />
                  Reagendar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      {scheduledData && isOpen && (
        <Rescheduling
          scheduled={scheduledData!}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          activeUser={activeUser!}
        />
      )}
      {scheduledData && isOpenCancel && (
        <CancelAppointment
          isOpenCancel={isOpenCancel}
          setIsOpenCancel={setIsOpenCancel}
          setRequestRemove={setRequestRemove}
        />
      )}
    </div>
  );
};
