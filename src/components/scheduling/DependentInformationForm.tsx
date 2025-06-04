import { type Dispatch, type SetStateAction } from "react";
import { DependentsCard } from "./DependentsCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useFormContext } from "react-hook-form";

type DependentInformationFormProps = {
  setView: Dispatch<SetStateAction<number>>;
};

export const DependentInformationForm = ({
  setView,
}: DependentInformationFormProps) => {
  const { watch } = useFormContext();
  const countDependents = watch("dependientesCount") || 0;

  return (
    <section
      id="select-dependent-form"
      aria-label="select-dependent-form"
      className="w-full"
    >
      <h2 className="mb-4 text-lg font-semibold">
        Ingresa los datos de tus dependientes
      </h2>

      <div className="max-w-[1200px] mx-auto flex flex-col items-center justify-start h-auto gap-10">
        {Array.from({ length: parseInt(countDependents) }).map((_, index) => (
          <DependentsCard key={index} aggregate={index} />
        ))}
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
            setView(3);
          }}
          className="text-[#3466cc] border-2 border-[#3466cc] hover:text-white hover:border-[#e9e9e9] font-medium py-2 px-4 rounded-full hover:cursor-pointer hover:bg-[#d1d1d1] duration-150"
        >
          Regresar
        </button>
        <button
          type="button"
          onClick={() => {
            setView(5);
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
