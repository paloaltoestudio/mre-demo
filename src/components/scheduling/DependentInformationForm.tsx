import { useEffect, useState } from "react";
import { DependentsCard } from "./DependentsCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export const DependentInformationForm = () => {
  const [aggregate, setAggregate] = useState<number>(0);

  useEffect(() => {
    setAggregate(3);
  }, []);

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
        {Array.from({ length: aggregate }).map((_, index) => (
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
          className="text-[#3466cc] border-2 border-[#3466cc] hover:text-white hover:border-[#e9e9e9] font-medium py-2 px-4 rounded-full hover:cursor-pointer hover:bg-[#d1d1d1] duration-150"
        >
          Regresar
        </button>
        <button
          type="submit"
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
