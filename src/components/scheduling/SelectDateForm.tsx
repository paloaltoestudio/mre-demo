import type { Dispatch, SetStateAction } from "react";
import type { ConsulatesType } from "../../types/dashboard/AppointmentTypes";
import { countryOptions } from "../../mocks/dashboardMocks/AppoinmentsMock";
import { DatePickerComponent } from "../DatePickerComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useFormContext } from "react-hook-form";

type SelectDateFormProps = {
  consulate: ConsulatesType;
  setView: Dispatch<SetStateAction<number>>;
};

export const SelectDateForm = ({ consulate, setView }: SelectDateFormProps) => {
  const { watch } = useFormContext();

  const procedures = watch("tramites");
  const countDependents = watch("dependientesCount") || 0;

  return (
    <section
      id="appointment-for-form"
      aria-label="appointment-for-form"
      className="w-full"
    >
      <div className="border-1 border-gray-200 hover:bg-gray-100 hover:cursor-default rounded-md w-full  px-4 py-3 justify-center flex flex-col shadow-lg">
        <h3 className="font-medium text-md flex items-center gap-1">
          <span className="w-5 h-5 flex justify-center items-center">
            <img
              src={
                countryOptions.filter(
                  (country) => country.value === consulate.country
                )[0].icon
              }
              alt={consulate.consulate.name}
            />
          </span>
          {
            countryOptions.filter(
              (country) => country.value === consulate.country
            )[0].label
          }
        </h3>
        <h3 className="font-medium text-md">{consulate.consulate.name}</h3>
        <p className="text-sm text-gray-600">
          Dirección: {consulate.consulate.address}
        </p>
        <p className="text-sm text-gray-600">
          Teléfono: {consulate.consulate.phone}
        </p>
        <p className="text-sm text-gray-600">
          Número de solicitantes:{" "}
          {countDependents === 0 ? "1" : countDependents}
        </p>
        <p className="text-sm text-gray-600">
          Trámites: {procedures?.map((p: any) => p.label).join(", ")}
        </p>
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
        <button
          type="button"
          className="mr-auto text-[#3466cc]  hover:text-[#343ecc] hover:underline  font-medium py-2 px-4 rounded-full hover:cursor-pointer duration-150"
        >
          Cancelar
        </button>

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
            setView?.(4);
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
