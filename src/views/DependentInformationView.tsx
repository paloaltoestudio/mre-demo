import { AuthForm } from "../components/public/auth/AuthForm";
import { DependentInformationForm } from "../components/scheduling/DependentInformationForm";

type formType = {
  dependentName: string;
  dependentType: string;
  dependentDOB: string;
  dependentID: string;
};
export const DependentInformationView = () => {
  const onSubmit = () => {};

  return (
    <div
      id="dependent-information-view"
      className="max-w-[1200px] mx-auto flex flex-col items-center"
    >
      <div className="w-11/12">
        <AuthForm<formType> onSubmit={onSubmit}>
          <DependentInformationForm />
        </AuthForm>
      </div>
    </div>
  );
};
