import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faCircleCheck,
  faCircleExclamation,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { CancelAppointment } from "../scheduling/CancelAppointment";
import { ReschedulingForm } from "../scheduling/ReschedulingForm";
import { format } from "date-fns";
import { toDate } from "../../configs/formats";
import { useActiveUser } from "../../hooks/useActiveUser";
import { useTokenExpiration } from "../../hooks/useTokenExpiration";
import { useTraceabilityLog } from "../../hooks/useTraceabilityLog";
import { SchedulingsStore } from "../../stores/schedulingsStore";
import { useAppointmentDetail } from "../../hooks/useAppointmentDetail";
import { useMutation } from "@tanstack/react-query";
import { postPublicRequest, putPublicRequest } from "../../services/fetchingService";
import { postAppointmentSchema } from "../../schemas/appointments/appointments";
import type {
  ResponseHashType,
  ResponsesTokenType,
} from "../../types/auth/hashSchemas";
import {
  CreateHashSchema,
  CreateTokenSchema,
} from "../../schemas/Auth/hashSchemas";
import type { AppointmentType, Estado } from "../../types/dashboard/AppointmentTypes";
import type { ResponseCancelAppointmentType } from "../../types/dashboard/cancelAppointmentTypes";
import { toast } from "react-toastify";

export const estadoColor: Record<Estado, string> = {
  Agendada: "bg-green-100 text-green-700",
  Cancelada: "bg-red-100 text-red-700",
  Atendida: "bg-gray-100 text-gray-700",
  Pendiente: "bg-yellow-100 text-yellow-700",
};

export const AppointmentDetail = () => {
  const { id: appointmentId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { activeUser } = useActiveUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCancel, setIsOpenCancel] = useState(false);
  const [scheduledData, setScheduledData] = useState<AppointmentType>();
  const [showRequirements, setShowRequirements] = useState(false);

  const { data: appointment, isLoading, error } = useAppointmentDetail(appointmentId);

  useEffect(() => {
    if (error) {
      toast.error("Error al cargar el detalle de la cita");
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center text-lg text-gray-600 font-semibold py-12">
            Cargando detalle de la cita...
          </div>
        </div>
      </div>
    );
  }

  if (error || !appointment) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center text-lg text-gray-600 font-semibold py-12">
            {error ? "Error al cargar la cita" : "Cita no encontrada"}
          </div>
          <button
            onClick={() => navigate("/dashboard/appointments")}
            className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
          >
            Volver a citas
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header con botón de regreso */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/dashboard/appointments")}
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Volver a citas
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            Detalle de la Cita
          </h1>
        </div>

        {/* Información del usuario */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Información del Usuario
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="text-sm">
              <span className="font-semibold">Nombres y apellidos:</span>{" "}
              {activeUser?.firstName &&
                `${activeUser.firstName} ${activeUser.lastName}`}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Documento:</span>{" "}
              {activeUser?.documentNumber && `${activeUser.documentNumber}`}
            </p>
          </div>
        </div>

        {/* Detalle de la cita */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Información de la Cita
            </h2>
            <span
              className={`px-3 py-1 text-sm font-semibold rounded-full ${
                estadoColor[appointment.status as Estado]
              }`}
            >
              {appointment.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Detalles Generales
              </h3>
              <div className="space-y-3">
                <p className="text-sm">
                  <span className="font-semibold">Fecha:</span>{" "}
                  {typeof appointment.date === 'string' ? appointment.date : ""}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Hora:</span>{" "}
                  {typeof appointment?.time === 'string' ? format(toDate(appointment.time), "hh:mm a") : ""}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Trámite:</span>{" "}
                  {typeof appointment.procedure === 'string' ? appointment.procedure : ''}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Oficina:</span>{" "}
                  {typeof appointment.office === 'string' ? appointment.office : ''}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Dirección:</span>{" "}
                  {typeof appointment.address === 'string' ? appointment.address : ''}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Solicitantes
              </h3>
              <div className="space-y-2">
                {appointment.appointmentFor != 2 && (
                  <div className="text-sm p-3 bg-gray-50 rounded-lg">
                    <span className="font-semibold">Principal:</span><br />
                    {activeUser?.firstName} {activeUser?.lastName}<br />
                    <span className="text-gray-600">
                      No. Documento: {activeUser?.documentNumber}
                    </span>
                  </div>
                )}
                {appointment.dependent?.map((dep: any, idx: number) => (
                  <div key={idx} className="text-sm p-3 bg-gray-50 rounded-lg">
                    <span className="font-semibold">Dependiente {idx + 1}:</span><br />
                    {dep?.firstNames} {dep?.lastNames}<br />
                    <span className="text-gray-600">
                      No. Documento: {dep?.documentNumber}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Requisitos */}
          {appointment.requirements && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-gray-900">
                  Requisitos
                </h3>
                <button
                  type="button"
                  onClick={() => setShowRequirements(!showRequirements)}
                  className="text-blue-600 hover:underline text-sm font-medium"
                >
                  {showRequirements ? "Ocultar requisitos" : "Ver requisitos"}
                </button>
              </div>
              
              {showRequirements && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <ul className="list-none space-y-2">
                    {appointment.requirements
                      ?.split(",")
                      ?.map((req: string, reqIndex: number) => (
                        <li
                          key={reqIndex}
                          className="text-sm text-gray-700 flex items-center"
                        >
                          <FontAwesomeIcon
                            icon={faCircleCheck}
                            className="text-green-500 mr-2 text-xs"
                          />
                          {req.trim()}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Acciones según el estado */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Acciones Disponibles
          </h3>
          
          <div className="flex flex-wrap gap-3">
            {appointment.status === "Agendada" && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpenCancel(true);
                    setScheduledData(appointment);
                  }}
                  className="text-blue-600 text-sm py-2 px-4 border border-blue-600 hover:bg-red-50 hover:border-red-600 hover:text-red-600 font-medium rounded-lg min-w-[120px] duration-150 transition-colors"
                >
                  Cancelar Cita
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(true);
                    setScheduledData(appointment);
                  }}
                  className="text-blue-600 text-sm py-2 px-4 border border-blue-600 hover:bg-blue-50 hover:border-blue-700 hover:text-blue-700 font-medium rounded-lg min-w-[120px] duration-150 transition-colors flex items-center"
                >
                  <FontAwesomeIcon
                    icon={faCalendar}
                    className="text-blue-500 text-lg mr-2"
                  />
                  Reagendar
                </button>
              </>
            )}

            {appointment.status === "Cancelada" && (
              <button
                type="button"
                onClick={() => {
                  setIsOpenCancel(true);
                  setScheduledData(appointment);
                }}
                className="text-blue-600 text-sm py-2 px-4 border border-blue-600 hover:bg-gray-50 hover:border-gray-600 hover:text-gray-600 font-medium rounded-lg min-w-[120px] duration-150 transition-colors flex items-center"
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  className="text-blue-500 text-lg mr-2"
                />
                Archivar
              </button>
            )}

            {appointment.status === "Atendida" && (
              <button
                type="button"
                onClick={() => {
                  setIsOpenCancel(true);
                  setScheduledData(appointment);
                }}
                className="text-blue-600 text-sm py-2 px-4 border border-blue-600 hover:bg-red-50 hover:border-red-600 hover:text-red-600 font-medium rounded-lg min-w-[120px] duration-150 transition-colors flex items-center"
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  className="text-blue-500 text-lg mr-2"
                />
                Eliminar
              </button>
            )}

            {appointment.status === "Pendiente" && (
              <button
                type="button"
                onClick={() => {
                  setIsOpen(true);
                  setScheduledData(appointment);
                }}
                className="text-blue-600 text-sm py-2 px-4 border border-blue-600 hover:bg-blue-50 hover:border-blue-700 hover:text-blue-700 font-medium rounded-lg min-w-[120px] duration-150 transition-colors flex items-center"
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

        {/* Modales */}
        {scheduledData && isOpen && (
          <ReschedulingForm
            scheduled={scheduledData}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            activeUser={activeUser!}
          />
        )}

        {scheduledData && isOpenCancel && (
          <CancelAppointment
            isOpenCancel={isOpenCancel}
            setIsOpenCancel={setIsOpenCancel}
            setRequestRemove={() => {}}
            scheduledData={scheduledData}
          />
        )}
      </div>
    </div>
  );
};
