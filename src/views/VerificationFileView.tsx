import { AuthForm } from "../components/public/auth/AuthForm";
import { VerificationFiles } from "../components/public/auth/VerificationFiles";
import { useNavigate } from "react-router-dom";

type formType = {
  file: File;
};

export const VerificationFileView = () => {
  const onSubmit = (data: formType) => {
    console.log(data.file);
  };
  const navigate = useNavigate();

  return (
    <div className="max-w-[1200px] mx-auto flex items-center flex-col justify-center">
      <div
        id="auth-view-driver-file"
        className="w-full mx-auto flex flex-col items-center justify-start h-auto shadow-lg mt-10 border border-gray-100 rounded-lg"

      >
        <AuthForm<formType> onSubmit={onSubmit}>
          <VerificationFiles />
        </AuthForm>
      </div>

      <div className="w-full flex flex-col items-end justify-end mt-10 pr-10">
        <button onClick={() => navigate('/auth/verification-code')}className="bg-[#3466cc] text-white font-medium py-2 px-4 rounded-full hover:cursor-pointer hover:bg-[#3467cce8]">Continuar</button>
      </div>
    </div>
  );
};
