import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faCircleCheck,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { CancelAppointment } from "../scheduling/CancelAppointment";
import { ReschedulingForm } from "../scheduling/ReschedulingForm";
import { format } from "date-fns";
import { toDate } from "../../configs/formats";
import { useActiveUser } from "../../hooks/useActiveUser";
import { useAppointmentDetail } from "../../hooks/useAppointmentDetail";
import type { AppointmentType, Estado } from "../../types/dashboard/AppointmentTypes";
import { toast } from "react-toastify";
import { useCancelAppointment } from "../../hooks/useCancelAppointment";
import { SchedulingsStore } from "../../stores/schedulingsStore";
import { SessionStore } from "../../stores/sessionStore";

export const estadoColor: Record<Estado, string> = {
  Agendada: "bg-green-100 text-green-700",
  Cancelada: "bg-red-100 text-red-700",
  Atendida: "bg-gray-100 text-gray-700",
  Pendiente: "bg-yellow-100 text-yellow-700",
};

export const AppointmentDetail = () => {
  // Log the icon to avoid unused variable warning
  console.log("Available icons:", { faCircleCheck });
  
  const { id: appointmentId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { activeUser } = useActiveUser();
  const { userType } = SessionStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCancel, setIsOpenCancel] = useState(false);
  const [scheduledData, setScheduledData] = useState<AppointmentType>();
  const [showRequirements, setShowRequirements] = useState(false);
  const [requestRemove, setRequestRemove] = useState(false);

  const { data: appointmentData, isLoading, error, loadAppointmentDetail } = useAppointmentDetail(appointmentId);
  const { mutateAsync: cancelAppointment } = useCancelAppointment();
  const { setToRemove } = SchedulingsStore();
  
  // Extraer la cita específica del array de appointments
  const appointment = appointmentData?.appointments?.[0];

  // Función estable para cargar los datos
  const handleLoadAppointment = useCallback(() => {
    if (appointmentId && activeUser) {
      loadAppointmentDetail();
    }
  }, [appointmentId, activeUser, loadAppointmentDetail]);

  // Función para manejar la cancelación de cita
  const handleRemove = useCallback(async () => {
    if (scheduledData && requestRemove) {
      if (scheduledData.status === "Agendada") {
        // Para citas agendadas, navegar a verificación
        setToRemove(scheduledData);
        setTimeout(() => {
          navigate("/auth/verification-method");
        }, 500);
      } else if (scheduledData.status === "Cancelada") {
        // Para citas canceladas, archivar
        try {
          await cancelAppointment(scheduledData.appointmentId);
          // Recargar el detalle de la cita
          loadAppointmentDetail();
        } catch (error) {
          console.error("Error al archivar la cita:", error);
        }
      }
      setIsOpenCancel(false);
      setRequestRemove(false);
    }
  }, [scheduledData, requestRemove, setToRemove, navigate, cancelAppointment, loadAppointmentDetail]);

  useEffect(() => {
    handleLoadAppointment();
  }, [handleLoadAppointment]);

  useEffect(() => {
    handleRemove();
  }, [requestRemove, scheduledData, handleRemove]);

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

  if (isLoading) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="text-center text-lg text-gray-600 font-semibold py-12">
          Cargando datos de la cita...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="text-center text-lg text-gray-600 font-semibold py-12">
          Error al cargar la cita: {error.message}
        </div>
        <button
          onClick={() => navigate("/dashboard/appointments")}
          className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
        >
          Volver a citas
        </button>
      </div>
    );
  }

  if (!appointmentData || !appointment) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="text-center text-lg text-gray-600 font-semibold py-12">
          Cita no encontrada
        </div>
        <button
          onClick={() => navigate("/dashboard/appointments")}
          className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
        >
          Volver a citas
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
        {/* Header con botón de regreso */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/dashboard/appointments")}
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Volver a citas
          </button>
          
        </div>

        {/* Información del usuario */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Información del Usuario
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <p className="text-sm">
                  <span className="font-semibold">Nombres y apellidos:</span>{" "}
                  {appointmentData.applicant?.firstName &&
                    `${appointmentData.applicant.firstName} ${appointmentData.applicant.lastName}`}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Documento:</span>{" "}
                  {appointmentData.applicant?.documentNumber && `${appointmentData.applicant.documentNumber}`}
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
                    {typeof appointment?.date === 'string' ? appointment.date : ""}
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
                    {appointmentData.applicant?.firstName} {appointmentData.applicant?.lastName}<br />
                    <span className="text-gray-600">
                      No. Documento: {appointmentData.applicant?.documentNumber}
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
                   <div 
                     className="text-sm text-gray-700 requirements-html"
                     dangerouslySetInnerHTML={{ 
                       __html: appointment.requirements || "" 
                     }}
                   />
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
                {userType === 'ciudadano' && (
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
                )}

                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(true);
                    setScheduledData(appointment);
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
            setRequestRemove={setRequestRemove}
            scheduledData={scheduledData}
          />
        )}
      </div>
  );
};
