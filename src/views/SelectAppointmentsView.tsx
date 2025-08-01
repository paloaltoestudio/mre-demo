import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { SelectAppointmentForm } from "../components/scheduling/SelectAppointmentForm";
import type {
  ConsulatesType,
  ResponsePutAppointmentType,
} from "../types/dashboard/AppointmentTypes";
import { AppointmentForForm } from "../components/scheduling/AppointmentForForm";
import { SelectDateForm } from "../components/scheduling/SelectDateForm";
import { DependentInformationForm } from "../components/scheduling/DependentInformationForm";
import { DinamicNav } from "../components/scheduling/DinamicNav";
import { Summary } from "../components/scheduling/Summary";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import type { CountriesInfoType } from "../types/dashboard/countryInfo";
import { useMutation } from "@tanstack/react-query";
import {
  putPublicRequest,
} from "../services/fetchingService";
import { useBookingTimerStore } from "../stores/bookingTimerStore";
import { useAppointmentWizardStore } from "../stores/appointmentWizardStore";



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
  const { step, setStep } = useAppointmentWizardStore();
  const [selectedOption, setSelectedOption] = useState<string>();
  const [consulate, setConsulate] = useState<ConsulatesType>({
    id: 0,
    name: "",
    cityId: 0,
    cityName: "",
    address: "",
  });
  const navigate = useNavigate();
  const resetTimer = useBookingTimerStore((state) => state.resetTimer);
  const resetWizard = useAppointmentWizardStore((state) => state.reset);
  const { preAppointmentId } = useBookingTimerStore();
  
  const methods = useForm();
  // const [activeUser, setActiveUser] = useState<UserType>();
  // const { user } = SessionStore();

  // useEffect(() => {
  //   const newUser = user.find(
  //     (user) => user.documentNumber.toString() === document.toString()
  //   );
  //   setActiveUser(
  //     newUser || {
  //       documentType: "CC",
  //       documentNumber: "10256341",
  //       firstName: "Luis",
  //       lastName: "Diaz",
  //       birthDate: "1990-01-01",
  //       email: "arquitecto@italm.com.co",
  //       phoneCode: "+57",
  //       phoneNumber: "3125642169",
  //       whatsappCode: "+57",
  //       whatsappNumber: "3125642169",
  //       password: "10256341",
  //       confirmPassword: "10256341",
  //       acceptData: true,
  //       acceptTerms: true,
  //     }
  //   );
  // }, []);

  // Fetching para dateBlocks;
  // const { mutateAsync } = useMutation({
  //   mutationFn: postPublicRequest<ResponseDateBlocksType>,
  //   onSuccess: (data: ResponseDateBlocksType) => {
  //     console.log(data);
  //     setDateBlocks(data);
  //   },
  //   onError() {
  //     toast.error("Ocurrió un error en los horarios", {
  //       icon: (
  //         <FontAwesomeIcon
  //           icon={faCircleExclamation}
  //           className="text-red-500"
  //         />
  //       ),
  //       autoClose: 1000,
  //       draggable: true,
  //       progress: undefined,
  //       hideProgressBar: true,
  //       className: "border-l-5 border-red-500 bg-white text-black shadow-md",
  //     });
  //   },
  // });



  const { mutateAsync: mutateAppointment } = useMutation({
    mutationFn: putPublicRequest<ResponsePutAppointmentType>,
    onSuccess: (data: ResponsePutAppointmentType) => {
      console.log(data);
      toast.success("Cita agendada correctamente", {
        icon: (
          <FontAwesomeIcon icon={faCircleCheck} className="text-green-500" />
        ),
        autoClose: 3000,
        draggable: true,
        progress: undefined,
        hideProgressBar: true,
        className: "border-l-5 border-green-500 bg-white text-black shadow-md",
      });
      setTimeout(() => {
        resetTimer();
        resetWizard();
        navigate("/dashboard/appointments");
      }, 1000);
    },
    onError() {
      toast.error("Ocurrió un error en el pre agendamiento de la cita", {
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



  // useEffect(() => {
  //   useBookingTimerStore.getState().resetTimer();
  // }, []);

  // const handleDateBlocks = async (completedData: SchedulingStoreType) => {
  //   await mutateAsync({
  //     url: "/date-blocks/CreateOrUpdate",
  //     schema: CreateDateBlockSchema,
  //     body: {
  //       officeId: completedData.consulate.id,
  //       date: completedData.date.toISOString(),
  //       description: "",
  //       active: true,
  //     },
  //   });
  // };

  const handleAppointment = async () => {
    if (preAppointmentId) {
      await mutateAppointment({
        url: `/Appointment/confirm-preappointment/${preAppointmentId}`,
      });
    }
  };



  return (
    <div
      id="select-appointments-view"
      className="max-w-[1200px] mx-auto flex flex-col items-center"
    >
      <FormProvider {...methods}>
        <div className="w-11/12 flex flex-col items-center justify-center">
          <DinamicNav currentStep={step} steps={steps} />
            <div className="mt-10 w-full">
            {step === 1 ? (
                <SelectAppointmentForm
                  setConsulate={setConsulate}
                  setView={(step: number) => setStep(step)}
                  countries={countries || ([] as CountriesInfoType["data"])}
                />
            ) : step === 2 ? (
              <AppointmentForForm
                consulate={consulate}
                setView={(step: number) => setStep(step)}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
            ) : step === 3 ? (
              <SelectDateForm // Montar el reagendamiento;
                consulate={consulate}
                setView={(step: number) => setStep(step)}
                selectedOption={selectedOption}
              />
            ) : step === 4 ? (
              <div
                id="dependent-information-view"
                className="max-w-[1200px] mx-auto flex flex-col items-center"
              >
                <DependentInformationForm setView={(step: number) => setStep(step)} />
              </div>
            ) : (
              step === 5 && (
                <Summary
                  consulate={consulate}
                  setView={(step: number) => setStep(step)}
                  selectedOption={selectedOption!}
                  onConfirmAppointment={handleAppointment}
                />
              )
            )}
          </div>
        </div>
      </FormProvider>
    </div>
  );
};
