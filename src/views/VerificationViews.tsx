import { useEffect, useState } from "react";
import { AuthForm } from "../components/public/auth/AuthForm";
import { VerificationCard } from "../components/public/auth/VerificationCard";
import { useNavigate, useParams } from "react-router-dom";
import { useRoutesStore } from "../stores/routesStore";
import { SessionStore } from "../stores/sessionStore";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { SchedulingsStore } from "../stores/schedulingsStore";

type formType = {
  code: number;
};

export const VerificationViews = () => {
  const [method, setMethod] = useState<{
    type: "email" | "sms" | "whatsapp";
    value: string;
  }>({ type: "email", value: "default@email.com" });
  const { fromAuth, registry, typeUser } = useRoutesStore();
  const { code, user, document, locationVerification } = SessionStore();
  const [invalidCode, setInvalidCode] = useState(false);
  const { toRemove, toReplace, rescheduling } = SchedulingsStore();

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

  const navigate = useNavigate();
  const onSubmit = (data: formType) => {
    if (+data.code !== code) setInvalidCode(true);
    else {
      if (fromAuth === false) {
        if (registry && typeUser === "Ciudadano") {
          navigate("/access/verification-id");
        } else navigate("/auth/verification-files");
      } else {
        navigate("/dashboard/appointments");
        if (locationVerification === "Reagendar") {
          rescheduling(toRemove, toReplace);
          toast.success("Cita reagendada correctamente", {
            icon: (
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-green-500"
              />
            ),
            autoClose: 3000,
            draggable: true,
            progress: undefined,
            hideProgressBar: true,
            className:
              "border-l-5 border-green-500 bg-white text-black shadow-md",
          });
        }
      }
    }
  };

  const resendCode = () => {
    toast.success("Código enviado", {
      icon: <FontAwesomeIcon icon={faCircleCheck} className="text-green-500" />,
      autoClose: 3000,
      draggable: true,
      progress: undefined,
      hideProgressBar: true,
      className: "border-l-5 border-green-500 bg-white text-black shadow-md",
    });
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
