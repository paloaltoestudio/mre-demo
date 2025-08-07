import { useFormContext, useWatch } from "react-hook-form";
import type { ConsulatesType } from "../../types/dashboard/AppointmentTypes";
import { useEffect, useState } from "react";
import { useActiveUser } from "../../hooks/useActiveUser";
import { CancelBtn } from "./CancelBtn";
import { SchedulingsStore } from "../../stores/schedulingsStore";
import { useQueryClient } from "@tanstack/react-query";
import type { CountriesInfoType } from "../../types/dashboard/countryInfo";
import { usePublicQuery } from "../../hooks/usePublicQuery";
import { CountriesInfoSchema } from "../../schemas/appointments/countryInfo.schema";
import type { unicProceduresResponseType } from "../../types/dashboard/proceduresTypes";
import { useTraceabilityLog } from "../../hooks/useTraceabilityLog";
import { format } from "date-fns";

type SummaryProps = {
  consulate: ConsulatesType;
  setView: (step: number) => void;
  selectedOption: string;
  onConfirmAppointment?: () => void;
};

export const Summary = ({
  consulate,
  setView,
  selectedOption,
  onConfirmAppointment,
}: SummaryProps) => {
  const { watch } = useFormContext();
  const dateWatch = watch("date");
  const horaWatch = watch("hora");
  const dependentsWatch = watch("dependientesCount") || 0;
  const cityWatch = watch("city");
  const { activeUser } = useActiveUser();
  const { country } = SchedulingsStore();
  const queryClient = useQueryClient();
  const countryOptions: CountriesInfoType = queryClient.getQueryData([
    "countriesInfo",
  ])!;
  const { control } = useFormContext();
  const [nameCity, setNameCity] = useState<string>("");
  const { logTraceabilityEvent } = useTraceabilityLog();
  const selectedCountry = useWatch({
    control,
    name: "country",
  });

  const selectedProcedure: unicProceduresResponseType["data"] = useWatch({
    control,
    name: "tramites",
  });

  const [dependentsInfo, setDependentsInfo] = useState<
    {
      names: string;
      lastNames: string;
      document: string;
      typeDocument: string;
    }[]
  >();

  const { data: citiesData } = usePublicQuery<CountriesInfoType>({
    key: ["all-cities", selectedCountry],
    url: `/City/by-country/${country}`,
    schema: CountriesInfoSchema,
  });

  useEffect(() => {
    if (dependentsWatch > 0) {
      const dependentsData = Array.from({ length: dependentsWatch }).map(
        (_, index) => ({
          names: watch(`names-${index}`),
          lastNames: watch(`last-names-${index}`),
          document: watch(`document-number-dependent-${index}`),
          typeDocument: watch(`type-document-${index}`),
        })
      );
      setDependentsInfo(dependentsData);
    } else {
      setDependentsInfo(undefined);
    }
  }, [dependentsWatch, watch]);

  useEffect(() => {
    const cityName = citiesData?.data?.filter((c) => c.id === cityWatch)[0]
      ?.name;
    setNameCity(cityName || "");
  }, [citiesData]);

  const handleConfirmAppointment = () => {
    // Crear la fecha completa de la cita combinando fecha y hora
    let appointmentDateTime = null;
    if (dateWatch && horaWatch) {
      const selectedDate = new Date(dateWatch);
      const [hours, minutes] = horaWatch.time.split(":");
      selectedDate.setHours(Number(hours), Number(minutes), 0, 0);
      appointmentDateTime = selectedDate.toISOString();
    }

    // Log cuando el usuario confirma la cita
    logTraceabilityEvent({
      procedure: "agendamiento",
      procedureStatus: "confirmacion_cita",
      modifiedFields: {
        appointmentDate: appointmentDateTime,
        appointmentDateLocal: dateWatch && horaWatch ? 
          `${format(new Date(dateWatch), "yyyy-MM-dd")} ${horaWatch.time}` : null,
        selectedProcedure: selectedProcedure,
        selectedOption,
        dependentsCount: dependentsWatch,
        dependentsInfo: dependentsInfo,
        officeId: consulate.id,
        officeName: consulate.name,
        officeAddress: consulate.address,
        countryId: country,
        countryName: countryOptions?.data?.filter((c) => c.id === country)[0]?.name,
        cityId: cityWatch,
        cityName: nameCity,
        userInfo: {
          firstName: activeUser?.firstName,
          lastName: activeUser?.lastName,
          documentNumber: activeUser?.documentNumber
        }
      },
      observations: `Usuario confirmó cita para ${selectedProcedure?.name} en ${consulate.name} el ${dateWatch && horaWatch ? 
        `${format(new Date(dateWatch), "dd/MM/yyyy")} a las ${horaWatch.time}` : 'fecha no seleccionada'}`
    });

    // Llamar a la función original de confirmación
    onConfirmAppointment?.();
  };

  return (
    <section
      id="appointment-for-form"
      aria-label="appointment-for-form"
      className="w-full"
    >
      <h2 className="font-medium text-lg">Resumen</h2>

      <div className="flex gap-5">
        <div className="w-full md:w-[48%] border-1 border-gray-200 hover:bg-gray-100 hover:cursor-default rounded-md px-4 py-3 flex flex-col shadow-lg">
          <p className="text-sm text-gray-600">
            Fecha:{" "}
            {dateWatch && horaWatch
              ? `${format(new Date(dateWatch), "dd/MM/yyyy")} a las ${horaWatch.time}`
              : "No seleccionada"}
          </p>
          <p className="text-sm text-gray-600">
            Trámites: {selectedProcedure?.name}
          </p>
          <p className="text-sm text-gray-600">Oficina: {consulate.name}</p>
          <p className="text-sm text-gray-600">
            País:{" "}
            {countryOptions?.data?.filter((c) => c.id === country)[0].name}
          </p>
          <p className="text-sm text-gray-600">Ciudad: {nameCity}</p>
          <p className="text-sm text-gray-600">
            Dirección: {consulate.address}
          </p>
        </div>
        <div className="w-full md:w-[50%] border-1 border-gray-200 hover:bg-gray-100 hover:cursor-default rounded-md px-4 py-3 flex flex-col shadow-lg">
          <h3 className="font-medium text-lg">Solicitantes</h3>
          <div className="mt-2">
            {selectedOption === "Para mí" ? (
              <p key={`self-name`} className="text-sm text-gray-600">
                {`${activeUser?.firstName} ${activeUser?.lastName}`}
              </p>
            ) : selectedOption === "Para mí y mis dependientes" ? (
              <div>
                <p key={`self-name`} className="text-sm text-gray-600">
                  {`${activeUser?.firstName} ${activeUser?.lastName}`}
                </p>

                {dependentsInfo?.map((dependent, index) => (
                  <p key={`name-${index}`} className="text-sm text-gray-600">
                    {`${dependent.names} ${dependent.lastNames}`}
                  </p>
                ))}
              </div>
            ) : (
              dependentsInfo?.map((dependent, index) => (
                <p key={`name-${index}`} className="text-sm text-gray-600">
                  {`${dependent.names} ${dependent.lastNames}`}
                </p>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-5 gap-1 border-1 border-gray-200 hover:bg-gray-100 hover:cursor-default rounded-md px-4 py-3 shadow-lg">
        <h2 className="font-medium text-lg">Requisitos</h2>
        <p className="text-sm text-gray-600">
          Debes tener en cuenta los requisitos para los siguientes trámites:
        </p>
        {
          <div className="mt-2">
            <h3 className="font-medium text-md">{selectedProcedure.name}</h3>
            <ul className="list-disc pl-5 mb-1 p-2">
              {selectedProcedure.requirements
                .split(",")
                .map((req: string, reqIndex: number) => (
                  <li key={reqIndex} className="text-sm text-gray-600 ml-2">
                    {req}
                  </li>
                ))}
            </ul>
          </div>
        }
      </div>
      <div className="w-full flex gap-5 items-end justify-end mt-10 mb-10">
        <CancelBtn />

        <button
          type="button"
          onClick={() => {
            if (dependentsWatch > 0) setView?.(4);
            else setView?.(3);
          }}
          className="text-[#3466cc] border-2 border-[#3466cc] hover:text-white hover:border-[#e9e9e9] font-medium py-2 px-4 rounded-full hover:cursor-pointer hover:bg-[#d1d1d1] duration-150"
        >
          Regresar
        </button>
        <button
          type="button"
          onClick={handleConfirmAppointment}
          className="bg-[#3466cc] border-[#3466cc] border-2 text-white font-medium py-2 px-4 rounded-full hover:cursor-pointer hover:bg-[#3467cce8] duration-150"
        >
          Agendar
        </button>
      </div>
    </section>
  );
};
