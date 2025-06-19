import { useState } from "react";
import { AuthForm } from "../components/public/auth/AuthForm";
import { SelectAppointmentForm } from "../components/scheduling/SelectAppointmentForm";
import type { ConsulatesType } from "../types/dashboard/AppointmentTypes";
import { AppointmentForForm } from "../components/scheduling/AppointmentForForm";
import { SelectDateForm } from "../components/scheduling/SelectDateForm";
import { DependentInformationForm } from "../components/scheduling/DependentInformationForm";
import { DinamicNav } from "../components/scheduling/DinamicNav";
import { Summary } from "../components/scheduling/Summary";
import { SchedulingsStore } from "../stores/schedulingsStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import type { CountriesInfoType } from "../types/dashboard/countryInfo";

const steps = [
  "Lugar de agendamiento",
  "Tipo de trámite",
  "Fecha y hora",
  "Datos dependientes",
  "Resumen",
];

type SelectAppointmentFormProps = {
  countries: CountriesInfoType["data"];
};

export const SelectAppointmentsView = ({
  countries,
}: SelectAppointmentFormProps) => {
  const [view, setView] = useState<number>(1);
  const [selectedOption, setSelectedOption] = useState<string>();
  const [consulate, setConsulate] = useState<ConsulatesType>({
    id: 0,
    name: "",
    cityId: 0,
    cityName: "",
    direction: "",
  });
  const { setScheduled } = SchedulingsStore();
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    const dependentsCount = data.dependientesCount || 0;

    let dependentsData;

    if (dependentsCount > 0) {
      dependentsData = Array.from({ length: dependentsCount }).map(
        (_, index) => ({
          names: data[`names-${index}`],
          lastNames: data[`last-names-${index}`],
          document: data[`document-number-dependent-${index}`],
          typeDocument: data[`type-document-${index}`],
        })
      );
    }

    const completedData = {
      ...data,
      consulate,
      selectedOption,
      parents: dependentsData,
      state: "Agendada",
    };

    setScheduled(completedData);
    toast.success("Cita agendada correctamente", {
      icon: <FontAwesomeIcon icon={faCircleCheck} className="text-green-500" />,
      autoClose: 3000,
      draggable: true,
      progress: undefined,
      hideProgressBar: true,
      className: "border-l-5 border-green-500 bg-white text-black shadow-md",
    });
    setTimeout(() => {
      navigate("/dashboard/appointments");
    }, 1000);
  };

  return (
    <div
      id="select-appointments-view"
      className="max-w-[1200px] mx-auto flex flex-col items-center"
    >
      <div className="w-11/12 flex flex-col items-center justify-center">
        <AuthForm<any> onSubmit={onSubmit}>
          <DinamicNav currentStep={view} steps={steps} />
          <div className="mt-10">
            {/* Toda la info del tramite */}
            {view === 1 ? (
              <SelectAppointmentForm
                setConsulate={setConsulate}
                setView={setView}
                countries={countries}
              />
            ) : view === 2 ? (
              <AppointmentForForm
                consulate={consulate}
                setView={setView}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
            ) : view === 3 ? (
              <SelectDateForm // Montar el reagendamiento;
                consulate={consulate}
                setView={setView}
                selectedOption={selectedOption}
              />
            ) : view === 4 ? (
              <div
                id="dependent-information-view"
                className="max-w-[1200px] mx-auto flex flex-col items-center"
              >
                <DependentInformationForm setView={setView} />
              </div>
            ) : (
              view === 5 && (
                <Summary
                  consulate={consulate}
                  setView={setView}
                  selectedOption={selectedOption!}
                />
              )
            )}
          </div>
        </AuthForm>
      </div>
    </div>
  );
};
