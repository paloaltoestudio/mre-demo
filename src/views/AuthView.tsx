import { useState } from "react";
import { AuthForm } from "../components/public/auth/AuthForm";
import { LoginForm } from "../components/public/auth/LoginForm";
import type { LoginType } from "../types/auth/LoginTypes";

export const AuthView = () => {
  const [typeUser, setTypeUser] = useState<"Ciudadano" | "Funcionario">(
    "Ciudadano"
  );

  // Función para manejar el envío del formulario.
  const onSubmit = (data: LoginType) => {console.log(data.documentNumber);};

  return (
    <div
      id="auth-view"
      className="max-w-[500px] mx-auto flex flex-col items-center justify-start h-auto shadow-lg mt-10 border border-gray-100 rounded-lg"
    >
      {/* Renderizar los componentes de formularios. */}
      <AuthForm<LoginType> onSubmit={onSubmit} >
        <LoginForm typeUser={typeUser} setTypeUser={setTypeUser}/>
      </AuthForm>
    </div>
  );
};
