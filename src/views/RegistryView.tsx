import { RegistryForm } from "../components/public/auth/RegistryForm";


export const RegistryView = () => {
  return (
    <div
      id="auth-view"
      className="max-w-[500px] mx-auto flex flex-col items-center justify-start h-auto shadow-lg mt-10 border border-gray-100 rounded-lg"
    >
      <RegistryForm />
    </div>
  );
};
