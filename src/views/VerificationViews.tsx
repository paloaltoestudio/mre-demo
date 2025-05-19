import { useEffect, useState } from "react";
import { AuthForm } from "../components/public/auth/AuthForm";
import { VerificationCard } from "../components/public/auth/VerificationCard";

type formType = {
  code: number;
};

export const VerificationViews = () => {
  // Setear en base al método de verificación;
  const [method, setMethod] = useState<"email" | "sms" | "whatsapp">(
    "whatsapp"
  );

  useEffect(() => {
    setMethod("whatsapp");
  }, []);

  const onSubmit = (data: formType) => {
    console.log(data.code);
  };

  const resendCode = () => {
    // Lógica para reenviar el código de verificación;
    console.log("Código reenviado");
  };

  return (
    <div
      id="auth-view"
      className="w-5/12 mx-auto flex flex-col items-center justify-start h-auto shadow-lg mt-10"
    >
      <AuthForm<formType> onSubmit={onSubmit}>
        {method === "email" ? (
          <VerificationCard
            title="Enviamos el correo de verificacion al correo"
            site="correoejemplo@correo.com"
            resendCode={resendCode}
          />
        ) : method === "sms" ? (
          <VerificationCard
            title="Enviamos el correo de verificacion al número"
            site="+57 300 000 0000"
            resendCode={resendCode}
          />
        ) : (
          <VerificationCard
            title="Enviamos el correo de verificacion al WhatsApp"
            site="+57 300 000 0000"
            resendCode={resendCode}
          />
        )}
      </AuthForm>
    </div>
  );
};
