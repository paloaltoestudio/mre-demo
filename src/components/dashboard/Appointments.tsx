import { useNavigate, useSearchParams } from "react-router-dom";
import type {
  AppointmentsType,
  AppointmentType,
  Estado,
} from "../../types/dashboard/AppointmentTypes";
import { SessionStore } from "../../stores/sessionStore";
import { useActiveUser } from "../../hooks/useActiveUser";
import { useTokenExpiration } from "../../hooks/useTokenExpiration";
import { useEffect, useState } from "react";
import { ENV_CONFIG } from "../../configs/environment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faCircleCheck,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { CancelAppointment } from "../scheduling/CancelAppointment";
import { format } from "date-fns";
import { toDate } from "../../configs/formats";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  postPublicRequest,
  putPublicRequest,
} from "../../services/fetchingService";
import { postAppointmentSchema } from "../../schemas/appointments/appointments";
import type {
  ResponseHashType,
  ResponsesTokenType,
} from "../../types/auth/hashSchemas";
import {
  CreateHashSchema,
  CreateTokenSchema,
} from "../../schemas/Auth/hashSchemas";
import { SchedulingsStore } from "../../stores/schedulingsStore";


import type { ResponseCancelAppointmentType } from "../../types/dashboard/cancelAppointmentTypes";
import { ReschedulingForm } from "../scheduling/ReschedulingForm";
import { useTraceabilityLog } from "../../hooks/useTraceabilityLog";

export const estadoColor: Record<Estado, string> = {
  Agendada: "bg-green-100 text-green-700",
  Cancelada: "bg-red-100 text-red-700",
  Atendida: "bg-gray-100 text-gray-700",
  Pendiente: "bg-yellow-100 text-yellow-700",
};

export const AppointmentCards = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { activeUser, setActiveUser, setTokenExpiration } = useActiveUser();
  const { setTokenExpiration: setExpiration } = useTokenExpiration();
  const [sche, setSche] = useState<AppointmentsType>();
  const [loader, setLoader] = useState(true);
  const [noAppointmentsMsg, setNoAppointmentsMsg] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCancel, setIsOpenCancel] = useState(false);
  const [scheduledData, setScheduledData] = useState<AppointmentType>();
  const [requestRemove, setRequestRemove] = useState(false);
  const { setToRemove, toRemove } = SchedulingsStore();
  const { logTraceabilityEvent } = useTraceabilityLog();
  const [showRequirementsMap, setShowRequirementsMap] = useState<
    Record<string, boolean>
  >({});
  const [hash, setHash] = useState<string | null>();
  const [token, setToken] = useState<ResponseHashType>();

  useEffect(() => {
    const rawHash = searchParams.get("hash");

    if (rawHash) {
      const corrected = rawHash.replace(/ /g, "+");
      const decoded = decodeURIComponent(corrected);
      setHash(decoded);
    } else {
      setHash(null);
    }

    setTimeout(() => {
      setLoader(false);
    }, 500);
  }, [searchParams]);

  useEffect(() => {
    if (hash) {
      handleHash();
    }
  }, [hash]);
  useEffect(() => {
    if (token) {
      handleToken();
    }
  }, [token]);

  const { mutateAsync: MutateHash } = useMutation({
    mutationFn: postPublicRequest<ResponseHashType>,
    onSuccess: (data: ResponseHashType) => {
      // console.log("token hash", data);
      console.log("Response external data", data);
      setToken(data);

      // Configurar expiración del token
      if (data.expiracion) {
        setTokenExpiration(data.expiracion);
        setExpiration(data.expiracion);
      }
    },
    onError: () => {
      toast.error("Ocurrió un error en la generación del token", {
        icon: (
          <FontAwesomeIcon
            icon={faCircleExclamation}
            className="text-red-500"
          />
        ),
        autoClose: 1000,
        draggable: true,
        progress: undefined,
        hideProgressBar: true,
        className: "border-l-5 border-red-500 bg-white text-black shadow-md",
      });
      // Redirigir a la app externa después de mostrar el error
      setTimeout(() => {
        window.location.href = ENV_CONFIG.AUTH_REDIRECT_URL;
      }, 2000);
    },
  });

  const {
    setUserId,
    setExternalId,
    setLocationVerification,
  } = SessionStore();
  const { mutateAsync: MutateToken } = useMutation({
    mutationFn: postPublicRequest<ResponsesTokenType>,
    onSuccess: (data: ResponsesTokenType) => {
      setExternalId(token?.externalId!);
      setActiveUser(data[0]);
      setUserId(data[0].id);
    },
    onError: () => {
      toast.error("Ocurrió un error en la generación del token", {
        icon: (
          <FontAwesomeIcon
            icon={faCircleExclamation}
            className="text-red-500"
          />
        ),
        autoClose: 1000,
        draggable: true,
        progress: undefined,
        hideProgressBar: true,
        className: "border-l-5 border-red-500 bg-white text-black shadow-md",
      });

      // Redirigir a la app externa después de mostrar el error
      setTimeout(() => {
        window.location.href = ENV_CONFIG.AUTH_REDIRECT_URL;
      }, 2000);
    },
  });

  const handleHash = async () => {
    if (hash) {
      await MutateHash({
        url: "/Token/decrypt",
        schema: CreateHashSchema,
        body: { hash: hash! },
      });
    }
  };

  const handleToken = async () => {
    if (token) {
      await MutateToken({
        url: "/User/external",
        schema: CreateTokenSchema,
        body: { externalId: token?.externalId },
      });
    }
  };

  const { mutateAsync: removeAsync } = useMutation({
    mutationFn: putPublicRequest<ResponseCancelAppointmentType>,
    onSuccess: async (data: ResponseCancelAppointmentType) => {
      console.log("Cita cancelada correctamente", data);
      
      // Log cuando se archiva exitosamente
      if (scheduledData) {
        logTraceabilityEvent({
          procedure: "agendamiento",
          procedureStatus: "archivado_exitoso",
          modifiedFields: {
            appointmentId: scheduledData.appointmentId,
            appointmentStatus: scheduledData.status,
            officeId: scheduledData.officeId,
            officeName: scheduledData.office,
            procedureId: scheduledData.procedureId,
            procedureName: scheduledData.procedure,
            userInfo: {
              firstName: activeUser?.firstName,
              lastName: activeUser?.lastName,
              documentNumber: activeUser?.documentNumber
            }
          },
          observations: `Usuario archivó cita ${scheduledData.appointmentId} con estado ${scheduledData.status}`
        });
      }
      
      toast.success("Cita archivada correctamente", {
        icon: (
          <FontAwesomeIcon icon={faCircleCheck} className="text-green-500" />
        ),
        autoClose: 3000,
        draggable: true,
        progress: undefined,
        hideProgressBar: true,
        className: "border-l-5 border-green-500 bg-white text-black shadow-md",
      });
      
      // Recargar las citas después de archivar
      await handleAppointment();
    },
    onError: (error) => {
      console.error("Error al archivar la cita:", error);
      
      // Log cuando hay error al archivar
      if (scheduledData) {
        logTraceabilityEvent({
          procedure: "agendamiento",
          procedureStatus: "error_archivado",
          modifiedFields: {
            appointmentId: scheduledData.appointmentId,
            appointmentStatus: scheduledData.status,
            error: error instanceof Error ? error.message : "Error desconocido",
            userInfo: {
              firstName: activeUser?.firstName,
              lastName: activeUser?.lastName,
              documentNumber: activeUser?.documentNumber
            }
          },
          observations: `Error al archivar cita ${scheduledData.appointmentId}: ${error instanceof Error ? error.message : "Error desconocido"}`
        });
      }
      
      toast.error("Error al archivar la cita", {
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
    },
  });

  const handleRemove = async () => {
    if (scheduledData && requestRemove) {
      if (scheduledData.status === "Agendada") {
        setLocationVerification("Eliminar agendamiento");

        setToRemove(scheduledData);

        setTimeout(() => {
          navigate("/auth/verification-method");
        }, 500);
      } else if (scheduledData.status === "Cancelada") {
        setToRemove(scheduledData);

        await removeAsync({
          url: `/Appointment/archive-appointment/${scheduledData.appointmentId}`,
        });
      }
      setIsOpenCancel(false);
      setRequestRemove(false);
    }
  };

  useEffect(() => {
    handleRemove();
  }, [
    requestRemove,
    scheduledData,
    // removeScheduled
  ]);

  const { mutateAsync } = useMutation({
    mutationFn: postPublicRequest<AppointmentsType>,
    onSuccess: (data: any) => {
      if (data && data.errors && Array.isArray(data.errors) && data.errors.includes("No se encontraron citas para el usuario.")) {
        setNoAppointmentsMsg("No se encontraron citas para el usuario.");
        setLoader(false);
        setSche(undefined);
      } else {
        setSche(data);
        console.log("data sche", sche);
        setNoAppointmentsMsg("");
      }
    },
    onError: (error: any) => {
      console.log("Error completo:", error);
      console.log("Error response:", error?.response);
      console.log("Error response data:", error?.response?.data);
      
      // Verificar si el error contiene el mensaje específico de no citas
      const errorMessage = "No se encontraron citas para el usuario.";
      
      if (
        error?.response?.data?.errors &&
        Array.isArray(error.response.data.errors) &&
        error.response.data.errors.includes(errorMessage)
      ) {
        console.log("Detectado mensaje de no citas, mostrando mensaje amigable");
        setNoAppointmentsMsg(errorMessage);
        setLoader(false);
        setSche(undefined);
        return;
      }
      
      // Otros errores: mostrar toast
      console.log("Error no relacionado con citas, mostrando toast");
      toast.error("Ocurrió un error al traer los agendamientos", {
        icon: (
          <FontAwesomeIcon
            icon={faCircleExclamation}
            className="text-red-500"
          />
        ),
        autoClose: 1000,
        draggable: true,
        progress: undefined,
        hideProgressBar: true,
        className: "border-l-5 border-red-500 bg-white text-black shadow-md",
      });
      setLoader(false);
    },
  });

  const handleAppointment = async () => {
    const postData = {
      firstName: activeUser?.firstName,
      lastName: activeUser?.lastName,
      documentNumber: String(activeUser?.documentNumber),
    };

    return await mutateAsync({
      url: "/Appointment/by-user",
      schema: postAppointmentSchema,
      body: postData,
    });
  };

  useEffect(() => {
    console.log("AppointmentCards: activeUser changed", activeUser);
    if (activeUser) {
      handleAppointment();
    }
  }, [activeUser]);

  // Efecto para recargar citas cuando se regresa de una cancelación
  useEffect(() => {
    const reloadParam = searchParams.get("reload");
    console.log("AppointmentCards: reload param", reloadParam, "activeUser", activeUser);
    if (reloadParam === "true" && activeUser) {
      console.log("AppointmentCards: Reloading appointments");
      handleAppointment();
      // Limpiar el parámetro de la URL
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete("reload");
      navigate(`/dashboard/appointments?${newSearchParams.toString()}`, { replace: true });
    }
  }, [searchParams, activeUser]);

  console.log("AppointmentCards: Rendering component", { activeUser, loader, sche, noAppointmentsMsg });
  
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
          {activeUser?.documentNumber && `${activeUser.documentNumber}`}
        </p>
      </div>

      {/* Cards de citas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {(() => {
          if (loader) {
            return (
              <div className="col-span-2 text-center text-lg text-gray-600 font-semibold py-12">
                Cargando citas...
              </div>
            );
          }
          
          if (noAppointmentsMsg) {
            return (
              <div className="col-span-2 text-center text-lg text-gray-600 font-semibold py-12">
                {noAppointmentsMsg}
              </div>
            );
          }
          
          if (!sche?.appointments || sche.appointments.length === 0) {
            return (
              <div className="col-span-2 text-center text-lg text-gray-600 font-semibold py-12">
                No se encontraron citas para mostrar
              </div>
            );
          }
          
          const filteredAppointments = sche.appointments.filter(
            (appt) => appt.status !== "Liberada" && appt.status !== "PreAgendada" && appt.status !== "ReAgendada"
          );
          
          if (filteredAppointments.length === 0) {
            return (
              <div className="col-span-2 text-center text-lg text-gray-600 font-semibold py-12">
                No hay citas activas para mostrar
              </div>
            );
          }
          
          return filteredAppointments.map((appt, index) => (
              <div
                key={`${appt.date}${index}`}
                className="bg-white hover:bg-gray-100 border border-gray-100 rounded-lg shadow-lg p-6 flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <p className="text-sm">
                    Fecha: {`${typeof appt.date === 'string' ? appt.date : ""}`}{" "}
                    {/* <br />Oficina: {appt.officeId} <br /> */}
                    {typeof appt?.time === 'string' ? format(toDate(appt.time), "hh:mm a") : ""}
                  </p>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      estadoColor[appt.status as Estado]
                    }`}
                  >
                    {appt.status}
                  </span>
                </div>
                <p className="text-sm">Trámite: {typeof appt.procedure === 'string' ? appt.procedure : ''}</p>
                <p className="text-sm">Oficina: {typeof appt.office === 'string' ? appt.office : ''}</p>
                <p className="text-sm">Dirección: {typeof appt.address === 'string' ? appt.address : ''}</p>

                <div className="text-sm mt-3">
                  <span className="font-semibold">Solicitantes:</span>
                  <ul className="list-none mt-1">
                    {appt.appointmentFor != 2 && (
                    <li>
                      {sche.applicant?.firstName} {sche.applicant?.lastName}{" "} - No. Documento: {sche.applicant?.documentNumber}
                    </li>
                    )}
                    {appt.dependent?.map((s, idx) => (
                      <li key={idx}>
                        {s?.firstNames} {s?.lastNames} - No. Documento: {s?.documentNumber}
                      </li>
                    ))}
                  </ul>
                </div>

                {showRequirementsMap[appt.date.toString() + index] && (
                  <div className="text-sm mt-3">
                    <span className="font-semibold">Requisitos:</span>
                    <div 
                      className="text-sm text-gray-600 ml-2 mt-1 requirements-html"
                      dangerouslySetInnerHTML={{ 
                        __html: appt.requirements || "" 
                      }}
                    />
                  </div>
                )}

                <div className="flex justify-end mt-3 gap-2">
                  {appt.status && (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          setShowRequirementsMap((prev) => ({
                            ...prev,
                            [appt.date.toString() + index]:
                              !prev[appt.date.toString() + index],
                          }));
                        }}
                        className="text-blue-600 hover:underline text-sm font-medium mr-auto"
                      >
                        {showRequirementsMap[appt.date.toString() + index]
                          ? "Ocultar requisitos"
                          : "Ver requisitos"}
                      </button>
                      
                      {/* <button
                        type="button"
                        onClick={() => navigate(`/dashboard/appointments/${appt.appointmentId}`)}
                        className="text-blue-600 text-sm py-[3px] px-3 border border-blue-600 hover:bg-blue-700 hover:text-white font-medium rounded-lg min-w-[100px] duration-150 transition-colors"
                      >
                        Ver Detalle
                      </button> */}
                      {appt.status === "Agendada" && (
                        <>
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
                    </>
                  )}
                  {appt.status === "Cancelada" && (
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
                  {appt.status === "Atendida" && (
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
                  {appt.status === "Pendiente" && (
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
            ));
          })()}
      </div>
      {scheduledData && isOpen && (
        <ReschedulingForm
          scheduled={scheduledData!}
          // setTimeId={setTimeId}
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
