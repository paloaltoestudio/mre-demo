import type { Dispatch, SetStateAction } from "react";
import type { ConsulatesType } from "../../types/dashboard/AppointmentTypes";
import { DatePickerComponent } from "../DatePickerComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useFormContext } from "react-hook-form";
import { CancelBtn } from "./CancelBtn";
import type { CountriesInfoType } from "../../types/dashboard/countryInfo";
import { useQueryClient } from "@tanstack/react-query";
import { SchedulingsStore } from "../../stores/schedulingsStore";

type SelectDateFormProps = {
  consulate: ConsulatesType;
  setView: Dispatch<SetStateAction<number>>;
  selectedOption?: string;
};

export const SelectDateForm = ({
  consulate,
  setView,
  selectedOption,
}: SelectDateFormProps) => {
  const { watch } = useFormContext();
  const queryClient = useQueryClient();
  const procedures = watch("tramites");
  const countDependents = watch("dependientesCount") || 0;
  const dependentsWatch = watch("dependientesCount") || 0;
  const countryOptions: CountriesInfoType = queryClient.getQueryData([
    "countriesInfo",
  ])!;
  const { country } = SchedulingsStore();

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
        <p className="text-sm text-gray-600">
          Dirección: {consulate.direction}
        </p>
        <p className="text-sm text-gray-600">
          Número de solicitantes:{" "}
          {countDependents === 0
            ? "1"
            : selectedOption === "Para mí y mis dependientes"
            ? countDependents + 1
            : countDependents}
        </p>
        <p className="text-sm text-gray-600">Trámite: {procedures.value}</p>
      </div>

      <div className="mt-6 w-full">
        <h2 className="font-medium text-lg">
          Selecciona fecha y hora de la cita
        </h2>

        <div className="w-full px-5 mt-5">
          <DatePickerComponent />
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
