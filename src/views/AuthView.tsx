import { useEffect, useState } from "react";
import { AuthForm } from "../components/public/auth/AuthForm";
import { LoginForm } from "../components/public/auth/LoginForm";
import type { LoginPasswordType, LoginType } from "../types/auth/LoginTypes";
import { LoginPasswordForm } from "../components/public/auth/LoginPasswordForm";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRoutesStore } from "../stores/routesStore";
import { SessionStore } from "../stores/sessionStore";

type LoginCombinedType = LoginType | LoginPasswordType;

export const AuthView = () => {
  const [typeUser, setTypeUser] = useState<"Ciudadano" | "Funcionario">(
    "Ciudadano"
  );
  const navigate = useNavigate();
  const [passwordView, setPasswordView] = useState(false);
  const { registry } = useParams();
  const { setFromAuth } = useRoutesStore();
  const { user, document, setDocument, setUser, setOfficial } = SessionStore();

  useEffect(() => {
    console.log(registry);
    if (registry === "verified") {
      setPasswordView(true);
    }
  }, [registry]);

  useEffect(() => {
    const defaultUser = {
      documentType: "CC",
      documentNumber: "10256341",
      firstName: "Luis Alberto",
      lastName: "Diaz Castro",
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
    };

    setUser(defaultUser);
  }, []);

  const onSubmit = (data: LoginType) => {
    setDocument(data.documentNumber.toString());
    navigate("/auth/verified");
    console.log("documentNumber", data.documentNumber);
    if (typeUser === "Funcionario") {
      setOfficial(true);
    }
  };

  const onSubmitPassword = (data: LoginPasswordType) => {
    const authUser = user.find(
      (user) => user.documentNumber.toString() === document.toString()
    );

    if (authUser && authUser.password === data.password) {
      setFromAuth(true);
      setPasswordView(false);
      console.log("password", data.password);
      navigate("/auth/verification-method");
    } else {
      alert("Contraseña incorrecta, por favor intente nuevamente.");
    }
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
          <LoginForm typeUser={typeUser} setTypeUser={setTypeUser} />
        ) : (
          <LoginPasswordForm
            typeUser={typeUser}
            setPasswordView={setPasswordView}
          />
        )}
      </AuthForm>
    </div>
  );
};
