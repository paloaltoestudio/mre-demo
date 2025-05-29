import { useState } from "react";
import { AuthForm } from "../components/public/auth/AuthForm";
import { SelectAppointmentForm } from "../components/scheduling/SelectAppointmentForm";
import type { ConsulatesType } from "../types/dashboard/AppointmentTypes";
import { AppointmentForForm } from "../components/scheduling/AppointmentForForm";

type formType = {
  country: string;
  city: string;
  consulate: {
    name: string;
    address: string; // Validar el tipo que traigamos de la API;
    phone: number;
  };
};

export const SelectAppointmentsView = () => {
  const [view, setView] = useState<number>(1);
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
    };
    console.log("Selected appointments:", completedData);
  };
  return (
    <div
      id="select-appointments-view"
      className="max-w-[1200px] mx-auto flex flex-col items-center"
    >
      <div className="w-11/12">
        <AuthForm<formType> onSubmit={onSubmit} >
          {/* Toda la info del tramite */}
          {view === 1 ? (
            <SelectAppointmentForm setConsulate={setConsulate} setView={setView}/>
          ) : (
            <AppointmentForForm consulate={consulate} setView={setView}/>
          )}
          
        </AuthForm>
      </div>
    </div>
  );
};
