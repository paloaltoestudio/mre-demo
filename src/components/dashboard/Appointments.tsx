import { useNavigate } from "react-router-dom";
import type { Estado } from "../../types/dashboard/appointmentTypes";
import { SessionStore, type UserType } from "../../stores/sessionStore";
import {
  SchedulingsStore,
  type SchedulingStoreType,
} from "../../stores/schedulingsStore";
import { useEffect, useState } from "react";
import { ReschedulingResume } from "../scheduling/ReschedulingResume";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { CancelAppointment } from "../scheduling/CancelAppointment";
import { ReschedulingForm } from "../scheduling/ReschedulingForm";
import { format } from "date-fns";
import { toDate } from "../../configs/formats";

export const estadoColor: Record<Estado, string> = {
  Agendada: "bg-green-100 text-green-700",
  Cancelada: "bg-red-100 text-red-700",
  Atendida: "bg-gray-100 text-gray-700",
  Pendiente: "bg-yellow-100 text-yellow-700",
};

export const AppointmentCards = () => {
  const navigate = useNavigate();
  const { user, document, setLocationVerification } = SessionStore();
  const { scheduled, removeScheduled, updateState } =
    SchedulingsStore();
  const [activeUser, setActiveUser] = useState<UserType>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenCancel, setIsOpenCancel] = useState<boolean>(false);
  const [scheduledData, setScheduledData] = useState<SchedulingStoreType>();
  const [rescheduledData, setRescheduledData] = useState<SchedulingStoreType>();
  const [isOpenResume, setIsOpenResume] = useState<boolean>(false);
  const [requestRemove, setRequestRemove] = useState<boolean>(false);
  const [showRequirementsMap, setShowRequirementsMap] = useState<
    Record<string, boolean>
  >({});
  const [loader, setLoader] = useState<boolean>(true);

  useEffect(() => {
    const newUser = user.find(
      (user) => user.documentNumber.toString() === document.toString()
    );
    setActiveUser(
      newUser || {
        documentType: "CC",
        documentNumber: "10256341",
        firstName: "Luis Alberto",
        lastName: "Diaz Castro",
        birthDate: "1990-01-01",
        email: "arquitecto@italm.com.co",
        phoneCode: "+57",
        phoneNumber: "3125642169",
        whatsappCode: "+57",
        whatsappNumber: "3125642169",
        password: "10256341",
        confirmPassword: "10256341",
        acceptData: true,
        acceptTerms: true,
      }
    );
    setTimeout(() => {
      setLoader(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (rescheduledData && isOpenResume) setIsOpen(false);
  }, [rescheduledData, isOpenResume]);

  const handleRemove = () => {
    if (scheduledData && requestRemove) {
      if (scheduledData.state === "Agendada") {
        setLocationVerification("Eliminar agendamiento");
        updateState(scheduledData);
        navigate("/auth/verification-method");
      } else if (scheduledData.state === "Cancelada")
        removeScheduled(scheduledData);

      setIsOpenCancel(false);
      setRequestRemove(false);
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
          {activeUser?.firstName &&
            `${activeUser.firstName} ${activeUser.lastName}`}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Documento:</span>{" "}
          {activeUser?.firstName && `${activeUser.documentNumber}`}
        </p>
      </div>

      {/* Cards de citas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {scheduled && !loader
          ? scheduled.map((appt, index) => (
              <div
                key={`${appt.date}${index}`}
                className="bg-white hover:bg-gray-100 border border-gray-100 rounded-lg shadow-lg p-6 flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <p className="text-sm">
                    Fecha:{" "}
                    {`${
                      appt.date
                        ? new Date(appt.date).toLocaleDateString("es-ES")
                        : ""
                    }`}{" "}
                    {format(toDate(appt?.hora), "hh:mm a")}
                  </p>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      estadoColor[appt.state as Estado]
                    }`}
                  >
                    {appt.state}
                  </span>
                </div>
                <p className="text-sm">Trámite: {appt.tramites.name}</p>
                <p className="text-sm">Oficina: {appt.consulate.name}</p>
                <p className="text-sm">Dirección: {appt.consulate.address}</p>
                <p className="text-sm">Código de confirmación: 23423</p>

                <div className="text-sm mt-3">
                  <span className="font-semibold">Solicitantes:</span>
                  <ul className="list-none mt-1">
                    {appt.parents?.map((s, idx) => (
                      <li key={idx}>
                        {s?.names} {s?.lastNames}. {s?.typeDocument.label}:{" "}
                        {s?.document}
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
                        {appt.tramites.requirements
                          .split(",")
                          .map((req: string, reqIndex: number) => (
                            <li
                              key={reqIndex}
                              className="text-sm text-gray-600 ml-2"
                            >
                              {req}
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}

                <div className="flex justify-end mt-3 gap-2">
                  {appt.state === "Agendada" && (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          setShowRequirementsMap((prev) => ({
                            ...prev,
                            [appt.date.toString() + index]:
                              !prev[appt.date.toString() + index],
                          }));

                          console.log(appt.tramites)
                        }}
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
                      className="text-blue-600 text-sm py-[5px] px-3 border-1 border-blue-600 hover:bg-blue-700 hover:text-white font-medium rounded-full min-w-[100px] duration-150 hover:border-gray-400 hover:cursor-pointer"
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-blue-500 text-lg mr-2"
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
            ))
          : [1, 2].map((item, index) => (
              <div
                key={`${item}-${index}`}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6"
              >
                <div className="">
                  {[1, 2].map((item) => (
                    <div
                      key={item}
                      className="p-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-3">
                          <div className="h-5 bg-gray-200 rounded animate-pulse w-64"></div>
                          <div className="h-4 bg-gray-200 rounded animate-pulse w-48"></div>
                          <div className="h-4 bg-gray-200 rounded animate-pulse w-48"></div>

                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                              <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                              <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                              <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                              <div className="h-4 bg-blue-200 rounded animate-pulse w-32"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
      </div>
      {scheduledData && isOpen && (
        <ReschedulingForm
          scheduled={scheduledData!}
          setRescheduledData={setRescheduledData}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          activeUser={activeUser!}
          setIsOpenResume={setIsOpenResume}
        />
      )}
      {rescheduledData && isOpenResume && (
        <ReschedulingResume
          scheduled={rescheduledData!}
          toDelete={scheduledData!}
          isOpen={isOpenResume}
          setIsOpen={setIsOpenResume}
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
