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
  }>({ type: "email", value: "" });

  const maskEmail = (email: string) => {
    const [name, domain] = email.split("@");

    if (name.length < 2) return email;

    const masked = name[0] + "*".repeat(name.length - 1);
    return `${masked}@${domain}`;
  };

  const maskPhone = (phone: string) => {
    if (phone.length <= 6) return phone;

    const start = phone.slice(0, 3);
    const end = phone.slice(-3);
    const masked = "*".repeat(phone.length - 6);

    return `${start}${masked}${end}`;
  };
  const { fromAuth, registry, typeUser } = useRoutesStore();
  const {
    locationVerification,
    official,
    setOtp,
    otp,
    externalId,
    activeUser,
  } = SessionStore();
  const [invalidCode, setInvalidCode] = useState(false);
  const {
    toRemove,
    reschedulings,
    //  removeScheduled
  } = SchedulingsStore();

  const { methodSelected } = useParams();
  useEffect(() => {
    // Verificar que tenemos los datos necesarios
    if (!activeUser) {
      console.warn("No hay usuario activo en el store");
      return;
    }

    if (!methodSelected) {
      console.warn("No hay método seleccionado");
      return;
    }

    const selectedMethod = methodSelected as "email" | "sms" | "whatsapp";
    let contactValue = "";
    let maskedValue = "";

    if (methodSelected === "sms") {
      contactValue = activeUser.phone || "";
      maskedValue = maskPhone(contactValue);
    } else if (methodSelected === "whatsapp") {
      contactValue = activeUser.whatsapp || "";
      maskedValue = maskPhone(contactValue);
    } else {
      contactValue = activeUser.email || "";
      maskedValue = maskEmail(contactValue);
    }

    if (contactValue) {
      setMethod({
        type: selectedMethod,
        value: maskedValue,
      });
    } else {
      console.warn("No se encontró valor de contacto para el método:", methodSelected);
      console.warn("Usuario activo:", {
        email: activeUser.email,
        phone: activeUser.phone,
        whatsapp: activeUser.whatsapp
      });
    }
  }, [activeUser, methodSelected]);

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

  const { toSavedDate, setRemoveSavedDate } = SchedulingsStore();

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
      try {
        await mutateAsync({
          url: "/Appointment/reschedule-appointment",
          schema: ReschedulingFormSchema,
          body: reschedulings,
        });
        setRemoveSavedDate(); // Limpiar el estado después del éxito
        return true; // Indica éxito
      } catch (error) {
        console.error("Error en reagendamiento:", error);
        return false; // Indica error
      }
    }
    return false; // Si no hay toSavedDate
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
        if (official) {
          navigate("/auth/official");
        } else {
          if (locationVerification === "Reagendar") {
            const success = await handleSubmit();
            if (success) {
              navigate("/dashboard/appointments?reload=true");
            }
            // Si no es exitoso, no navegamos y el error ya se muestra en el toast
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
            navigate("/dashboard/appointments?reload=true");
          } else {
            navigate("/dashboard/appointments?reload=true");
          }
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
