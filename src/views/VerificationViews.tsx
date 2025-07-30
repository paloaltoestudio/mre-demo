import { useEffect, useState } from "react";
import { AuthForm } from "../components/public/auth/AuthForm";
import { VerificationCard } from "../components/public/auth/VerificationCard";
import { useNavigate, useParams } from "react-router-dom";
import { useRoutesStore } from "../stores/routesStore";
import { SessionStore } from "../stores/sessionStore";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { SchedulingsStore } from "../stores/schedulingsStore";
import { useMutation } from "@tanstack/react-query";
import {
  putPublicRequest
} from "../services/fetchingService";
import type { ResponseCancelAppointmentType } from "../types/dashboard/cancelAppointmentTypes";
import { CancelDataAppointmentSchema } from "../schemas/appointments/cancelAppointment.schema";
import { useSendOTP } from "../hooks/Auth/useSendOTP";
import type { ResponsePreAppointmentType } from "../types/dashboard/preAppointmentTypes";
import { ReschedulingFormSchema } from "../schemas/appointments/appointments";

type formType = {
  code: number;
};

export const VerificationViews = () => {
  const [method, setMethod] = useState<{
    type: "email" | "sms" | "whatsapp";
    value: string;
  }>({ type: "email", value: "default@email.com" });
  const { fromAuth, registry, typeUser } = useRoutesStore();
  const {
    user,
    document,
    locationVerification,
    official,
    setOtp,
    otp,
    externalId,
  } = SessionStore();
  const [invalidCode, setInvalidCode] = useState(false);
  const {
    toRemove,
    reschedulings,
    //  removeScheduled
  } = SchedulingsStore();

  const { methodSelected } = useParams();
  useEffect(() => {
    const matchedUser = user.find(
      (u) => u.documentNumber.toString() === document?.toString()
    );

    if (!matchedUser) return;

    const selectedMethod = methodSelected as "email" | "sms" | "whatsapp";
    const contactValue =
      methodSelected === "sms"
        ? matchedUser.phoneNumber
        : methodSelected === "whatsapp"
        ? matchedUser.whatsappNumber
        : matchedUser.email;

    if (contactValue) {
      setMethod({
        type: selectedMethod,
        value: contactValue,
      });
    }
  }, [user, methodSelected]);

  const { mutateAsync: CancelPreAppointment } = useMutation({
    mutationFn: putPublicRequest<ResponseCancelAppointmentType>,
    onSuccess: (data: ResponseCancelAppointmentType) => {
      console.log("Cita cancelada correctamente", data);
      toast.success("Cita cancelada correctamente", {
        icon: (
          <FontAwesomeIcon icon={faCircleCheck} className="text-green-500" />
        ),
        autoClose: 3000,
        draggable: true,
        progress: undefined,
        hideProgressBar: true,
        className: "border-l-5 border-green-500 bg-white text-black shadow-md",
      });
    },
    onError: (error) => {
      console.log(error);
      toast.error(
        "Error al cancelar la cita, ten en cuenta que solo se pueden cancelar citas con más de 24 horas de anticipación",
        {
          icon: (
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="text-red-500"
            />
          ),
          autoClose: 3000,
          draggable: true,
          progress: undefined,
          hideProgressBar: true,
          className: "border-l-5 border-red-500 bg-white text-black shadow-md",
        }
      );
    },
  });

  const { toSavedDate } = SchedulingsStore();

  const { mutateAsync } = useMutation({
    mutationFn: putPublicRequest<ResponsePreAppointmentType>,
    onSuccess: (data: ResponsePreAppointmentType) => {
      console.log("Data from reschedule-appointment:", data);
      toast.success("Cita reagendada correctamente", {
        icon: (
          <FontAwesomeIcon icon={faCircleCheck} className="text-green-500" />
        ),
        autoClose: 3000,
        draggable: true,
        progress: undefined,
        hideProgressBar: true,
        className: "border-l-5 border-green-500 bg-white text-black shadow-md",
      });
    },
    onError: () => {
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

  const handleSubmit = async () => {
    if (toSavedDate) {
      await mutateAsync({
        url: "/Appointment/reschedule-appointment",
        schema: ReschedulingFormSchema,
        body: reschedulings,
      });
    }
  };

  const navigate = useNavigate();
  const onSubmit = async (data: formType) => {
    console.log("Form submitted with data:", data);
    console.log("OTP:", otp);
    if (data.code.toString() !== otp?.toString()) setInvalidCode(true);
    else {
      if (fromAuth === false) {
        if (registry && typeUser === "Ciudadano") {
          navigate("/access/verification-id");
        } else navigate("/auth/verification-files");
      } else {
        if (official) navigate("/auth/official");
        else navigate("/dashboard/appointments");
        if (locationVerification === "Reagendar") {
          await handleSubmit();
        } else if (
          locationVerification === "Eliminar agendamiento" &&
          !official
        ) {
          // removeScheduled(toRemove);
          // Aqui se tira el update para el agendamiento;
          await CancelPreAppointment({
            url: `/Appointment/cancel-appointment/${toRemove.appointmentId}`,
            schema: CancelDataAppointmentSchema,
            body: {
              appointmentId: toRemove.appointmentId,
            },
          });
        }
      }

      setOtp(null);
    }
  };

  const { sendOTP } = useSendOTP({ setOtp });

  const resendCode = () => {
    useEffect(() => {
      if (methodSelected && externalId) {
        const submitted = methodSelected;
        sendOTP(externalId, submitted);
      }
    }, [methodSelected]);
  };

  return (
    <div
      id="auth-view"
      className="max-w-[500px] mx-auto flex flex-col items-center justify-start h-auto shadow-lg mt-10 border border-gray-100 rounded-lg"
    >
      <AuthForm<formType> onSubmit={onSubmit}>
        {method.type === "email" ? (
          <VerificationCard
            title="Enviamos el correo de verificacion al correo"
            site={method.value}
            methodType={method.type}
            resendCode={resendCode}
            invalidCode={invalidCode}
          />
        ) : method.type === "sms" ? (
          <VerificationCard
            title="Enviamos el correo de verificacion al número"
            site={method.value}
            methodType={method.type}
            resendCode={resendCode}
            invalidCode={invalidCode}
          />
        ) : (
          <VerificationCard
            title="Enviamos el correo de verificacion al WhatsApp"
            site={method.value}
            methodType={method.type}
            resendCode={resendCode}
            invalidCode={invalidCode}
          />
        )}
      </AuthForm>
    </div>
  );
};
