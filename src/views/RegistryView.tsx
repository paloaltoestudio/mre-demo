import { AuthForm } from "../components/public/auth/AuthForm";
import { RegistryForm } from "../components/public/auth/RegistryForm";

type formType = {
  code: number;
};

export const RegistryView = () => {
  const onSubmit = (data: formType) => {
    console.log(data);
  };

  return (
    <div
      id="auth-view"
      className="w-5/12 mx-auto flex flex-col items-center justify-start h-auto shadow-lg mt-10"
    >
      <AuthForm<formType> onSubmit={onSubmit}>
        <RegistryForm />
      </AuthForm>
    </div>
  );
};
