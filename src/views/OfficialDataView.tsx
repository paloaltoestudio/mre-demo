import { AuthForm } from "../components/public/auth/AuthForm";
import { OfficialDataForm } from "../components/scheduling/OfficialDataForm";

type formType = {
  documentType: string;
  documentNumber: string;
  firstName: string;
  secondName: string;
  secondLastName: string;
};

export const OfficialDataView = () => {
  const onSubmit = (data: formType) => {
    console.log("Official Data Submitted:", data);
  };

  return (
    <div id="auth-offical-data" className="">
      <AuthForm<formType> onSubmit={onSubmit}>
        <section className="flex justify-center">
          <OfficialDataForm />
        </section>
      </AuthForm>
    </div>
  );
};
