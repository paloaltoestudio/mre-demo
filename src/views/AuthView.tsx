import { useEffect, useState } from "react";
import { AuthForm } from "../components/public/auth/AuthForm";
import { LoginForm } from "../components/public/auth/LoginForm";
import type { LoginPasswordType, LoginType } from "../types/auth/LoginTypes";
import { LoginPasswordForm } from "../components/public/auth/LoginPasswordForm";

type LoginCombinedType = LoginType | LoginPasswordType;

export const AuthView = () => {
  const [typeUser, setTypeUser] = useState<"Ciudadano" | "Funcionario">(
    "Ciudadano"
  );

  const [passwordView, setPasswordView] = useState(false);

  useEffect(() => {
    setPasswordView(false);
  }, []);

  // Funciones para manejar el envío del formulario.
  const onSubmit = (data: LoginType) => {
    setPasswordView(true);
    console.log("documentNumber", data.documentNumber);
  };

  const onSubmitPassword = (data: LoginPasswordType) => {
    setPasswordView(false);
    alert("Login successful");
    console.log("password",data.password);
  };

  const handleSubmit = (data: LoginCombinedType) => {
    if ("password" in data) {
      onSubmitPassword(data);
    } else {
      onSubmit(data);
    }
  };

  return (
    <div
      id="auth-view"
      className="max-w-[500px] mx-auto flex flex-col items-center justify-start h-auto shadow-lg mt-10 border border-gray-100 rounded-lg"
    >
      <AuthForm<LoginCombinedType> onSubmit={handleSubmit}>
        {!passwordView ? (
          <LoginForm typeUser={typeUser} setTypeUser={setTypeUser}/>
        ) : (
          <LoginPasswordForm typeUser={typeUser} setPasswordView={setPasswordView}/>
        )}
      </AuthForm>
    </div>
  );
};
