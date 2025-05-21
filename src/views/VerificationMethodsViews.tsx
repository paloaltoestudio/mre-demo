import { AuthForm } from "../components/public/auth/AuthForm";
import { VerificationMethod } from "../components/public/auth/VerificationMethod";
import { useNavigate } from "react-router-dom";

type formType = {
  method: string;
};

export const VerificationMethodsViews = () => {

  const navigate = useNavigate();
  const onSubmit = (data: formType) => {
    const method = JSON.parse(data.method);
    navigate("/auth/verification-code/"+ method.type);
    console.log(data.method);
  };

  return (
    <div
      id="auth-view-verification-method"
      className="max-w-[500px] mx-auto flex flex-col items-center justify-start h-auto shadow-lg mt-10 border border-gray-100 rounded-lg"
    >
      <AuthForm<formType> onSubmit={onSubmit}>
        <VerificationMethod />
      </AuthForm>
    </div>
  );
};
