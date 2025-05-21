import { AuthForm } from "../components/public/auth/AuthForm";
import { VerificationIDForm } from "../components/public/auth/VerificationIDForm";
import { useNavigate } from "react-router-dom";

type formType = {
  file: File;
};

export const VerificationIDView = () => {
  const onSubmit = (data: formType) => {
    console.log(data.file);
  };
  const navigate = useNavigate();
  return (
    <div className="max-w-[1000px] min-w-[600px] mx-auto flex items-center flex-col justify-center p-2">
      <div
        id="auth-view-driver-file"
        className="w-full mx-auto flex flex-col items-center justify-start h-auto shadow-lg mt-10 border border-gray-100 rounded-lg"
      >
        <AuthForm<formType> onSubmit={onSubmit}>
          <VerificationIDForm />
        </AuthForm>
      </div>

      <div className="w-full flex flex-row gap-2 items-end justify-end mt-10 pr-10">
        <button className="min-w-[100px] max-w-[110px] border-[#3466cc] border-2 text-[#3466cc] font-medium py-2 px-4 rounded-full hover:cursor-pointer hover:bg-gray-300 hover:text-white hover:border-gray-300 duration-200">
          Cancelar
        </button>
        <button onClick={() => navigate('/auth/verification-method')} className="min-w-[100px] max-w-[110px] bg-[#3466cc] border-[#3466cc] border-2 text-white font-medium py-2 px-4 rounded-full hover:cursor-pointer hover:bg-[#3467cce8] duration-200">
          Enviar
        </button>
      </div>
    </div>
  );
};
