import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { ConsulatesType } from "../../types/dashboard/AppointmentTypes";
import { DatePickerComponent } from "../DatePickerComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { useFormContext } from "react-hook-form";
import { CancelBtn } from "./CancelBtn";
import type { CountriesInfoType } from "../../types/dashboard/countryInfo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SchedulingsStore } from "../../stores/schedulingsStore";
import type { DateSchemaType } from "../../types/dashboard/dateTypes";
import { postPublicRequest } from "../../services/fetchingService";
import { toast } from "react-toastify";
import { outputDatesSchema } from "../../schemas/appointments/dates.schema";
import type {
  unicProceduresResponseType
} from "../../types/dashboard/proceduresTypes";
import { useBookingTimerStore } from "../../stores/bookingTimerStore";
import { useNavigate } from "react-router-dom";

type SelectDateFormProps = {
  consulate: ConsulatesType;
  setView: (step: number) => void;
  selectedOption?: string;
};

export const SelectDateForm = ({
  consulate,
  setView,
  selectedOption,
}: SelectDateFormProps) => {
  const { watch } = useFormContext();
  const queryClient = useQueryClient();
  const countDependents = watch("dependientesCount") || 0;
  const dependentsWatch = watch("dependientesCount") || 0;
  const countryOptions: CountriesInfoType = queryClient.getQueryData([
    "countriesInfo",
  ])!;
  const { country } = SchedulingsStore();
  const [dates, setDates] = useState<DateSchemaType[]>();
  const navigate = useNavigate();
  const { timeLeft, isActive, startTimer, expireTimer, expiredByTimeout, clearExpiredFlag } = useBookingTimerStore();

  const { mutateAsync } = useMutation({
    mutationFn: postPublicRequest<DateSchemaType[]>,
    onSuccess: (data: DateSchemaType[]) => {
      queryClient.setQueryData(["all-dates"], data);
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

  const procedureWatcher: unicProceduresResponseType["data"] =
    watch("tramites");

  const handleDates = async () => {
    const data = {
      url: "/DateTimeAvailable/by-officeId-proceduresId",
      schema: outputDatesSchema,
      body: {
        officeId: consulate.id,
        proceduresId: [procedureWatcher.id],
      },
    };
    await mutateAsync(data);
  };

  useEffect(() => {
    handleDates();
  }, []);

  // Mostrar contador en la parte superior
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Eliminar el useEffect de expiración, ya no es necesario

  return (
    <section
      id="appointment-for-form"
      aria-label="appointment-for-form"
      className="w-full"
    >
      
      <div className="border-1 border-gray-200 hover:bg-gray-100 hover:cursor-default rounded-md w-full  px-4 py-3 justify-center flex flex-col shadow-lg">
        <h3 className="font-medium text-md flex items-center gap-1">
          {countryOptions?.data?.filter((c) => c.id === country)[0].name}
        </h3>
        <h3 className="font-medium text-md">{consulate.name}</h3>
        <p className="text-sm text-gray-600">Dirección: {consulate.address}</p>
        <p className="text-sm text-gray-600">
          Número de solicitantes:{" "}
          {countDependents === 0
            ? "1"
            : selectedOption === "Para mí y mis dependientes"
            ? countDependents + 1
            : countDependents}
        </p>
        <p className="text-sm text-gray-600">
          Trámite: {procedureWatcher?.name}
        </p>
      </div>

      <div className="mt-6 w-full">
        <h2 className="font-medium text-lg">
          Selecciona fecha y hora de la cita
        </h2>

        <div className="w-full px-5 mt-5">
          <DatePickerComponent dateInfo={dates || ([] as DateSchemaType[])} />
        </div>
      </div>
      <div className="w-full flex gap-5 items-end justify-end mt-10 mb-10">
        <CancelBtn />

        <button
          type="button"
          onClick={() => {
            setView?.(2);
          }}
          className="text-[#3466cc] border-2 border-[#3466cc] hover:text-white hover:border-[#e9e9e9] font-medium py-2 px-4 rounded-full hover:cursor-pointer hover:bg-[#d1d1d1] duration-150"
        >
          Regresar
        </button>
        <button
          type="button"
          onClick={() => {
            // Iniciar temporizador solo si hay fecha/hora seleccionada
            // (puedes agregar validación aquí si es necesario)
            startTimer(3); // 5 minutos
            if (dependentsWatch > 0) setView?.(4);
            else setView?.(5);
          }}
          className="bg-[#3466cc] border-[#3466cc] border-2 text-white font-medium py-2 px-4 rounded-full hover:cursor-pointer hover:bg-[#3467cce8] duration-150"
        >
          Continuar
          <span className="ml-2">
            <FontAwesomeIcon icon={faArrowRight} />
          </span>
        </button>
      </div>
    </section>
  );
};
