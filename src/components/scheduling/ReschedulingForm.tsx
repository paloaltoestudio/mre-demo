import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { Modal } from "../Modal";
import { AuthForm } from "../public/auth/AuthForm";
import {
  SchedulingsStore,
  type SchedulingStoreType,
} from "../../stores/schedulingsStore";
import type { UserType } from "../../stores/sessionStore";
import { estadoColor } from "../dashboard/Appointments";
import type { Estado } from "../../types/dashboard/AppointmentTypes";
import { DatePickerComponent } from "../DatePickerComponent";
import type { DateSchemaType } from "../../types/dashboard/dateTypes";
import { outputDatesSchema } from "../../schemas/appointments/dates.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postPublicRequest } from "../../services/fetchingService";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

type formType = {
  date: Date;
  hora: string;
};

export type ReschedulingProps = {
  scheduled: SchedulingStoreType;
  setRescheduledData: Dispatch<SetStateAction<SchedulingStoreType | undefined>>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  activeUser: UserType;
  setIsOpenResume: Dispatch<SetStateAction<boolean>>;
};

export const ReschedulingForm = ({
  scheduled,
  setRescheduledData,
  isOpen,
  setIsOpen,
  activeUser,
  setIsOpenResume,
}: ReschedulingProps) => {
  const [dates, setDates] = useState<DateSchemaType[]>();

  const onSubmit = (data: formType) => {
    const scheduledData: SchedulingStoreType = {
      ...scheduled,
      date: data.date,
      hora: data.hora,
    };

    setRescheduledData(scheduledData);
    setIsOpenResume(true);
  };

  const { procedure } = SchedulingsStore();

  // const { data: DatesData } = usePublicQuery<DatesType>({
  //   key: ["dates"],
  //   url: `/DateTimeAvailable/by-${scheduled.tramites.id}-${scheduled.country}`,
  //   schema: DatesSchema,
  // });
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: postPublicRequest<DateSchemaType[]>,
    onSuccess: (data: DateSchemaType[]) => {
      queryClient.setQueryData(["all-dates"], data);
      console.log("Fechas", data);
      setDates(data);
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
      url: "/DateTimeAvailable/by-officeId-proceduresId",
      schema: outputDatesSchema,
      body: {
        officeId: scheduled.consulate.id,
        proceduresId: [1],
      },
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
              <p className="text-sm text-gray-800 mt-2">
                <span className="font-medium">Fecha:</span>{" "}
                {`${
                  scheduled.date
                    ? new Date(scheduled.date).toLocaleDateString("es-ES")
                    : ""
                }`}{" "}
              </p>
              <p className="text-sm text-gray-800">
                <span className="font-medium">Oficina:</span>{" "}
                {scheduled.consulate.name}
              </p>
              <div className="text-sm">
                <span className="font-medium">TD + Doc:</span>
                <ul className="list-none pl-2 mt-2">
                  {scheduled.parents?.map((s, idx) => (
                    <li key={idx}>
                      {s.names} {s.lastNames}
                    </li>
                  ))}
                  {scheduled.selectedOption !== "Para mis dependientes" && (
                    <li>
                      {activeUser?.firstName} {activeUser?.lastName}
                    </li>
                  )}
                </ul>
              </div>
              <div className="text-sm">
                <span className="font-medium">TD + Doc:</span>
                <ul className="list-none pl-2 mt-2">
                  {scheduled.parents?.map((s, idx) => (
                    <li key={idx}>
                      {s.typeDocument.label} {s.document}
                    </li>
                  ))}
                  {scheduled.selectedOption !== "Para mis dependientes" && (
                    <li>
                      {activeUser?.documentType} {activeUser?.documentNumber}
                    </li>
                  )}
                </ul>
              </div>
              <div>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    estadoColor[scheduled.state as Estado]
                  }`}
                >
                  {scheduled.state}
                </span>
              </div>
              <div className="text-sm mt-3">
                <span className="font-semibold">Tipo de trámite:</span>
                {/* <ul className="list-none pl-2 mt-2">
                  {scheduled.tramites?.map((s, idx) => (
                    <li key={idx}>{s.label}</li>
                  ))}
                </ul> */}
                <p className="text-sm text-gray-600">Trámite: {procedure}</p>
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
              {scheduled.state === "Agendada" && (
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
                    className="text-white font-medium hover:cursor-pointer hover:bg- text-sm p-2 duration-150 hover:bg-blue-700 border-1 border-blue-600  bg-blue-600 rounded-full min-w-[100px]"
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
