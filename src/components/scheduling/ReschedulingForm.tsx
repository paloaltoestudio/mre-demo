import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { Modal } from "../Modal";
import { AuthForm } from "../public/auth/AuthForm";
import { estadoColor } from "../dashboard/Appointments";
import type {
  AppointmentType,
  Estado,
} from "../../types/dashboard/AppointmentTypes";
import { DatePickerComponent } from "../DatePickerComponent";
import type { DateSchemaType, DatesSchemaType } from "../../types/dashboard/dateTypes";
import { DatesResponseSchema } from "../../schemas/appointments/dates.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getPublicRequest } from "../../services/fetchingService";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faCircleExclamation,
  faCircleCheck 
} from "@fortawesome/free-solid-svg-icons";
import type { ResponseTokenType } from "../../types/auth/hashSchemas";
import { SchedulingsStore } from "../../stores/schedulingsStore";
import { useNavigate } from "react-router-dom";
import { useTraceabilityLog } from "../../hooks/useTraceabilityLog";
import { format } from "date-fns";
import { toDate } from "../../configs/formats";

type formType = {
  date: Date;
  hora: any; // Cambiado a any porque puede ser un objeto con availabilityId
};

export type ReschedulingProps = {
  scheduled: AppointmentType;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  activeUser: ResponseTokenType;
};

export const ReschedulingForm = ({
  scheduled,
  isOpen,
  setIsOpen,
  activeUser,
}: ReschedulingProps) => {
  const [dates, setDates] = useState<DateSchemaType[]>();
  const [isLoading, setIsLoading] = useState(false);
  const { toSavedDate, setRemoveSavedDate } = SchedulingsStore();
  const navigate = useNavigate();
  const { logTraceabilityEvent } = useTraceabilityLog();
  
  // Debug: ver el valor de scheduled.date
  console.log("scheduled.date en ReschedulingForm:", scheduled.date);
  
  useEffect(() => {
    console.log("agenda", scheduled);
  }, []);

  const onSubmit = async (_data: formType) => {
    if (!toSavedDate) {
      toast.error("Por favor selecciona una fecha y hora", {
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
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      console.log('Token para reagendamiento:', token);
      
      const reschedulingData = {
        appointmentOldId: scheduled.appointmentId,
        availabilityBlockId: toSavedDate,
      };
      
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
      
      if (response.ok) {
        const responseData = await response.json();
        console.log('Respuesta exitosa:', responseData);
        
        // Log cuando se reagenda exitosamente
        logTraceabilityEvent({
          procedure: "agendamiento",
          procedureStatus: "reagendamiento_exitoso",
          modifiedFields: {
            appointmentOldId: scheduled.appointmentId,
            availabilityBlockId: toSavedDate,
            oldDate: scheduled.date,
            oldTime: scheduled.time,
            newDate: _data.date,
            newTime: _data.hora?.time,
            officeId: scheduled.officeId,
            officeName: scheduled.office,
            procedureId: scheduled.procedureId,
            procedureName: scheduled.procedure,
            userInfo: {
              firstName: activeUser?.firstName,
              lastName: activeUser?.lastName,
              documentNumber: activeUser?.documentNumber
            }
          },
          observations: `Usuario reagendó cita ${scheduled.appointmentId} de ${scheduled.date} ${scheduled.time} a nueva fecha/hora`
        });
        
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
        setIsOpen(false); // Cerrar el modal
        // Navegar a las citas actualizadas
        navigate("/dashboard/appointments?reload=true");
      } else {
        const errorData = await response.json();
        console.error('Error en reagendamiento:', errorData);
        
        // Log cuando hay error en el reagendamiento
        logTraceabilityEvent({
          procedure: "agendamiento",
          procedureStatus: "error_reagendamiento",
          modifiedFields: {
            appointmentOldId: scheduled.appointmentId,
            availabilityBlockId: toSavedDate,
            error: errorData?.message || "Error desconocido",
            userInfo: {
              firstName: activeUser?.firstName,
              lastName: activeUser?.lastName,
              documentNumber: activeUser?.documentNumber
            }
          },
          observations: `Error al reagendar cita ${scheduled.appointmentId}: ${errorData?.message || "Error desconocido"}`
        });
        
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
      
      // Log cuando hay error en el reagendamiento
      logTraceabilityEvent({
        procedure: "agendamiento",
        procedureStatus: "error_reagendamiento",
        modifiedFields: {
          appointmentOldId: scheduled.appointmentId,
          availabilityBlockId: toSavedDate,
          error: error instanceof Error ? error.message : "Error desconocido",
          userInfo: {
            firstName: activeUser?.firstName,
            lastName: activeUser?.lastName,
            documentNumber: activeUser?.documentNumber
          }
        },
        observations: `Error al reagendar cita ${scheduled.appointmentId}: ${error instanceof Error ? error.message : "Error desconocido"}`
      });
      
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
    } finally {
      setIsLoading(false);
    }
  };

  // const { procedure } = SchedulingsStore();

  // const { data: DatesData } = usePublicQuery<DatesType>({
  //   key: ["dates"],
  //   url: `/DateTimeAvailable/by-${scheduled.tramites.id}-${scheduled.country}`,
  //   schema: DatesSchema,
  // });
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: getPublicRequest<DatesSchemaType>,
    onSuccess: (data: DatesSchemaType) => {
      queryClient.setQueryData(["all-dates"], data.data);
      console.log("Fechas", data);
      setDates(data.data);
    },
    onError: () => {
      toast.error("Error al hacer la petición", {
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
    },
  });

  const handleDates = async () => {
    const data = {
      url: `/AvailabilityBlock/office/${scheduled.officeId}/next-5-days?procedureId=${scheduled.procedureId}`,
      schema: DatesResponseSchema,
    };
    await mutateAsync(data);
  };

  useEffect(() => {
    handleDates();
  }, []);

  return (
    <AuthForm<formType> onSubmit={onSubmit}>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        content={
          <form className="w-9/12 max-h-[90vh] overflow-y-auto bg-white border border-gray-100 rounded-lg shadow-lg p-6 flex flex-col gap-1">
            <h2 className="text-lg font-medium">Reagendar cita</h2>

            <div className="mt-7 flex flex-col gap-2 text-start">
              <h3 className="font-medium text-md">Datos de la cita</h3>
              {/* {console.log("scheduled.date en ReschedulingForm:", scheduled.date)} */}
              <p className="text-sm text-gray-800 mt-2">
                <span className="font-medium">Fecha:</span>{" "}
                {scheduled.date} {" "} <span className="font-medium">Hora:</span> {typeof scheduled?.time === 'string' ? format(toDate(scheduled.time), "hh:mm a") : ""} (horario local de la oficina)
              </p>
              <p className="text-sm text-gray-800">
                <span className="font-medium">Oficina:</span> {scheduled.office}
              </p>
              <div className="text-sm">
                <span className="font-medium">Nombres y Documentos de los solicitantes:</span>
                <ul className="list-none pl-2 mt-2">
                  {scheduled.dependent?.map((s, idx) => (
                    <li key={idx}>
                      {s.firstNames} {s.lastNames} - No. Documento: {s.documentNumber}
                    </li>
                  ))}
                  {scheduled.appointmentFor != 2 && (
                  <li>
                    {activeUser?.firstName} {activeUser?.lastName} - No. Documento: {activeUser?.documentNumber}
                  </li>
                  )}
                  {/* {scheduled.selectedOption !== "Para mis dependientes" && (
                  )} */}
                </ul>
              </div>
              <div>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    estadoColor[scheduled.status as Estado]
                  }`}
                >
                  {scheduled.status}
                </span>
              </div>
              <div className="text-sm mt-3">
                <span className="font-semibold">Tipo de trámite:</span>
                {/* <ul className="list-none pl-2 mt-2">
                  {scheduled.tramites?.map((s, idx) => (
                    <li key={idx}>{s.label}</li>
                  ))}
                </ul> */}
                <p className="text-sm text-gray-600">
                  Trámite: {scheduled.procedure}
                </p>
              </div>
            </div>

            <div className="mt-6 w-full">
              <h2 className="font-medium text-lg">
                Selecciona fecha y hora de la cita
              </h2>

              <div className="w-full px-5 mt-5">
                <DatePickerComponent
                  dateInfo={dates || ([] as DateSchemaType[])}
                />
              </div>
            </div>

            <div className="flex justify-end mt-3 gap-2">
              {scheduled.status === "Agendada" && (
                <>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="text-blue-600 font-medium hover:cursor-pointer hover:bg-gray-400 hover:border-gray-200 duration-150 hover:text-white text-sm p-2 border-1 border-blue-600 rounded-full min-w-[100px]"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="text-white font-medium hover:cursor-pointer hover:bg- text-sm p-2 duration-150 hover:bg-blue-700 border-1 border-blue-600  bg-blue-600 rounded-full min-w-[100px] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Reagendando..." : "Reagendar"}
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
