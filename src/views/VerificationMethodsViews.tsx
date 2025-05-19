import { AuthForm } from "../components/public/auth/AuthForm";
import { VerificationMethod } from "../components/public/auth/VerificationMethod";

type formType = {
  method: string;
};

export const VerificationMethodsViews = () => {
  const onSubmit = (data: formType) => {
    // Fetching para el codigo;
    console.log(data.method);
  };

  return (
    <div
      id="auth-view-verification-method"
      className="w-5/12 mx-auto flex flex-col items-center justify-start h-auto shadow-lg"
    >
      <AuthForm<formType> onSubmit={onSubmit}>
        <VerificationMethod />
      </AuthForm>
    </div>
  );
};
