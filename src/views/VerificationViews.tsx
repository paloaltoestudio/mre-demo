import { useEffect, useState } from "react";
import { AuthForm } from "../components/public/auth/AuthForm";
import { VerificationCard } from "../components/public/auth/VerificationCard";
import { useNavigate, useParams } from "react-router-dom";
import { useRoutesStore } from "../stores/routesStore";
import { SessionStore } from "../stores/sessionStore";

type formType = {
  code: number;
};

export const VerificationViews = () => {
  const [method, setMethod] = useState<{
    type: "email" | "sms" | "whatsapp";
    value: string;
  }>({ type: "email", value: "default@email.com" });
  const { fromAuth, registry, typeUser } = useRoutesStore();
  const { code, user, document } = SessionStore();

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
    console.log("Verification code:", data.code);

    if (+data.code !== code) alert("Código de verificación incorrecto");
    else {
      if (fromAuth === false) {
        if (registry && typeUser === "Ciudadano") {
          navigate("/access/verification-id");
        } else navigate("/auth/verification-files");
      } else {
        navigate("/dashboard/appointments");
      }
    }
  };

  const resendCode = () => {
    // Lógica para reenviar el código de verificación;
    console.log("Código reenviado");
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
            resendCode={resendCode}
          />
        ) : method.type === "sms" ? (
          <VerificationCard
            title="Enviamos el correo de verificacion al número"
            site={method.value}
            resendCode={resendCode}
          />
        ) : (
          <VerificationCard
            title="Enviamos el correo de verificacion al WhatsApp"
            site={method.value}
            resendCode={resendCode}
          />
        )}
      </AuthForm>
    </div>
  );
};
