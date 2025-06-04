import { RegistryForm } from "../components/public/auth/RegistryForm";

// type formType = {
//   code: number;
// };

export const RegistryView = () => {
  // const {setFromAuth}= useRoutesStore()

  // const onSubmit = (data: formType) => {
  //   setFromAuth(false)
  //   console.log(data);
  // };

  return (
    <div
      id="auth-view"
      className="max-w-[500px] mx-auto flex flex-col items-center justify-start h-auto shadow-lg mt-10 border border-gray-100 rounded-lg"
    >
      <RegistryForm />
      {/* <AuthForm<formType> onSubmit={onSubmit}>
      </AuthForm> */}
    </div>
  );
};
