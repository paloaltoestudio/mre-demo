import { useState } from "react";
import { AuthForm } from "../components/public/auth/AuthForm";
import { SelectAppointmentForm } from "../components/scheduling/SelectAppointmentForm";
import type { ConsulatesType } from "../types/dashboard/AppointmentTypes";
import { AppointmentForForm } from "../components/scheduling/AppointmentForForm";
import { SelectDateForm } from "../components/scheduling/SelectDateForm";
import { DependentInformationForm } from "../components/scheduling/DependentInformationForm";
import { DinamicNav } from "../components/scheduling/DinamicNav";

type formType = {
  country: string;
  city: string;
  consulate: {
    name: string;
    address: string;
    phone: number;
  };
};
const steps = [
  "Lugar de agendamiento",
  "Tipo de trámite",
  "Fecha y hora",
  "Resumen",
];

export const SelectAppointmentsView = () => {
  const [view, setView] = useState<number>(1);
  const [selectedOption, setSelectedOption] = useState<string>();
  const [consulate, setConsulate] = useState<ConsulatesType>({
    country: "CO",
    city: "BOG",
    consulate: {
      name: "Consulado General BOG",
      address: "Calle 110 #10-20",
      phone: 2000000000,
    },
  });

  const onSubmit = (data: formType) => {
    const completedData = {
      ...data,
      consulate,
      selectedOption,
    };
    console.log("Selected appointments:", completedData);
  };
  return (
    <div
      id="select-appointments-view"
      className="max-w-[1200px] mx-auto flex flex-col items-center"
    >
      <DinamicNav currentStep={view} steps={steps} />
      <div className="mt-10 w-11/12">
        <AuthForm<formType> onSubmit={onSubmit}>
          {/* Toda la info del tramite */}
          {view === 1 ? (
            <SelectAppointmentForm
              setConsulate={setConsulate}
              setView={setView}
            />
          ) : view === 2 ? (
            <AppointmentForForm
              consulate={consulate}
              setView={setView}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
          ) : view === 3 ? (
            <SelectDateForm consulate={consulate} setView={setView} />
          ) : (
            view === 4 && (
              <div
                id="dependent-information-view"
                className="max-w-[1200px] mx-auto flex flex-col items-center"
              >
                <DependentInformationForm setView={setView} />
              </div>
            )
          )}
        </AuthForm>
      </div>
    </div>
  );
};
