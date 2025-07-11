import { useEffect, useState } from "react";
import { AuthForm } from "../components/public/auth/AuthForm";
import { SelectAppointmentForm } from "../components/scheduling/SelectAppointmentForm";
import type {
  ConsulatesType,
  ResponsePutAppointmentType,
} from "../types/dashboard/appointmentTypes";
import { AppointmentForForm } from "../components/scheduling/AppointmentForForm";
import { SelectDateForm } from "../components/scheduling/SelectDateForm";
import { DependentInformationForm } from "../components/scheduling/DependentInformationForm";
import { DinamicNav } from "../components/scheduling/DinamicNav";
import { Summary } from "../components/scheduling/Summary";
import {
  SchedulingsStore,
  type SchedulingStoreType,
} from "../stores/schedulingsStore";
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
  postPublicRequest,
  putPublicRequest,
} from "../services/fetchingService";
import type { ResponseDateBlocksType } from "../types/dashboard/dateBlocksTypes";
import { CreateDateBlockSchema } from "../schemas/appointments/dateBlocks";
import type { ResponsePreAppointmentType } from "../types/dashboard/preAppointmentTypes";
import { CreatePreAppointmentSchema } from "../schemas/appointments/preAppointments";
import { SessionStore, type UserType } from "../stores/sessionStore";

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
    address: "",
  });
  const navigate = useNavigate();
  const [toSchedule, setToSchedule] = useState<SchedulingStoreType>();
  const [appointmentId, setAppointmentId] = useState<number>(0);
  const [activeUser, setActiveUser] = useState<UserType>();
  const { user } = SessionStore();

  useEffect(() => {
    const newUser = user.find(
      (user) => user.documentNumber.toString() === document.toString()
    );
    setActiveUser(
      newUser || {
        documentType: "CC",
        documentNumber: "10256341",
        firstName: "Luis",
        lastName: "Diaz",
        birthDate: "1990-01-01",
        email: "arquitecto@italm.com.co",
        phoneCode: "+57",
        phoneNumber: "3125642169",
        whatsappCode: "+57",
        whatsappNumber: "3125642169",
        password: "10256341",
        confirmPassword: "10256341",
        acceptData: true,
        acceptTerms: true,
      }
    );
  }, []);

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

  const { mutateAsync: mutatePreAppointment } = useMutation({
    mutationFn: postPublicRequest<ResponsePreAppointmentType>,
    onSuccess: (data: ResponsePreAppointmentType) => {
      console.log(data);
      setAppointmentId(data.appointmentId);
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

  useEffect(() => {
    if (appointmentId) {
      handleAppointment();
    }
  }, [appointmentId]);

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

  const { toSavedDate } = SchedulingsStore();

  useEffect(() => {
    if (appointmentId) {
      handleAppointment();
    }
  }, [appointmentId]);

  useEffect(() => {
    if (toSchedule) {
      handlePreAppointment();
    }
  }, [toSchedule]);

  const handlePreAppointment = async () => {
    await mutatePreAppointment({
      url: `/Appointment/pre-appointment`,
      schema: CreatePreAppointmentSchema,
      body: {
        userId: activeUser?.documentNumber,
        availabilityBlockId: toSavedDate, // id de la hora;
        dependents: toSchedule?.parents ? toSchedule?.parents?.map((parent) => ({
          relationshipTypeId: 1,
          documentTypeId: parent.typeDocument,
          documentNumber: 1,
          firstNames: parent.names,
          lastNames: parent.lastNames,
        })) : [],
        tramiteId: toSchedule?.tramites.id,
      },
    });
  };

  const handleAppointment = async () => {
    await mutateAppointment({
      url: `/Appointment/confirm-preappointment${appointmentId}`,
    });
  };

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
      city: 1,
    };
    setToSchedule(completedData);
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
            {view === 1 ? (
              <SelectAppointmentForm
                setConsulate={setConsulate}
                setView={setView}
                countries={countries || ([] as CountriesInfoType["data"])}
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
