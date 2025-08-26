import { useState } from "react";
import { AuthForm } from "../components/public/auth/AuthForm";
import { VerificationMethod } from "../components/public/auth/VerificationMethod";

type methodType = {
  type: string;
  value: string;
};

type formType = {
  method: methodType;
};

export const VerificationMethodsViews = () => {
  const [submitted, setSubmitted] = useState<methodType["type"]>();

  const onSubmit = async (data: formType) => {
    try {
      const validMethod = JSON.parse(data.method.toString()) as methodType;
      console.log("Método seleccionado:", validMethod);
      setSubmitted(validMethod.type);
      
      // Aquí podríamos agregar lógica adicional si es necesario
      // Por ejemplo, navegar a la siguiente pantalla o hacer alguna validación
    } catch (error) {
      console.error("Error procesando método seleccionado:", error);
    }
  };

  return (
    <div
      id="auth-view-verification-method"
      className="max-w-[500px] mx-auto flex flex-col items-center justify-start h-auto shadow-lg mt-10 border border-gray-100 rounded-lg"
    >
      <AuthForm<formType> onSubmit={onSubmit}>
        <VerificationMethod submitted={submitted} />
      </AuthForm>
    </div>
  );
};
