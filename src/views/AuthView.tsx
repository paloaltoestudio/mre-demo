import { useEffect, useState } from "react";
import { AuthForm } from "../components/public/auth/AuthForm";
import { LoginForm } from "../components/public/auth/LoginForm";
import type { LoginPasswordType, LoginType } from "../types/auth/LoginTypes";
import { LoginPasswordForm } from "../components/public/auth/LoginPasswordForm";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

type LoginCombinedType = LoginType | LoginPasswordType;

export const AuthView = () => {
  const [typeUser, setTypeUser] = useState<"Ciudadano" | "Funcionario">(
    "Ciudadano"
  );
  const navigate = useNavigate();
  const [passwordView, setPasswordView] = useState(false);
  // const [searchParams] = useSearchParams();
  // const verified = searchParams.get('registry');
  const {registry} = useParams();
  useEffect(() => {
    console.log(registry);
    if (registry === "verified") {
      setPasswordView(true);
    }
    // setPasswordView(false);
  }, [registry]);

  // Funciones para manejar el envío del formulario.
  const onSubmit = (data: LoginType) => {
    // setPasswordView(true);
    navigate("/dashboard/appointments")
    console.log("documentNumber", data.documentNumber);
  };

  const onSubmitPassword = (data: LoginPasswordType) => {
    setPasswordView(false);
    console.log("password",data.password);
    navigate("/dashboard/appointments")
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
