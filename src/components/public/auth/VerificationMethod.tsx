import { useFormContext } from "react-hook-form";
import { MethodsMock } from "../../../mocks/authMocks/MethodsMock";

type MethodType = "email" | "sms" | "whatsapp";

export const VerificationMethod = () => {
  const methods = useFormContext();
  const selectedMethod = methods.watch("method");
const isFormValid = !!selectedMethod;

  const maskEmail = (email: string) => {
    const [name, domain] = email.split("@");

    if (name.length < 2) return email;

    const masked = name[0] + "*".repeat(name.length - 1);
    return `${masked}@${domain}`;
  };

  const maskPhone = (phone: string) => {
    if (phone.length <= 6) return phone;

    const start = phone.slice(0, 3);
    const end = phone.slice(-3);
    const masked = "*".repeat(phone.length - 6);

    return `${start}${masked}${end}`;
  };

  const methodList: MethodType[] = ["email", "sms", "whatsapp"];

  return (
    <div className="mb-4 w-full">
      <div id="method-title" className="border-b-2 border-gray-300 w-full">
        <h2 className="text-center p-4 font-normal text-lg text-gray-800">
          Ciudadano
        </h2>
      </div>

      <h3 className="mt-5 mb-5 font-medium text-center w-full">
        Elige donde deseas recibir el código de verificación
      </h3>

      <div className="flex flex-col items-center justify-center gap-4 p-5">
        {methodList.map((method) => (
          <div
            key={method}
            className="border border-gray-300 p-2 w-full rounded-md flex gap-2"
          >
            <input
              type="radio"
              id={method}
              value={method}
              {...methods.register("method", {
                required: "Debe seleccionar un método de verificación",
              })}
            />
            <div className="flex flex-col">
              <label htmlFor={method}>
                {method === "email"
                  ? "Correo electrónico"
                  : method === "sms"
                  ? "SMS"
                  : "WhatsApp"}
              </label>
              <span className="">
                {method === "email"
                  ? maskEmail(MethodsMock.email)
                  : maskPhone(MethodsMock[method])}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div
        id="buttons-login"
        className="w-full flex flex-col justify-center items-center gap-3"
      >
        <button
          className={`w-11/12 p-2 flex flex-col justify-center items-center mt-2 rounded-full  ${
            isFormValid
              ? "text-md bg-[#3366cc] text-white hover:cursor-pointer"
              : "bg-gray-300 text-gray-400 text-md"
          }`}
          type="submit"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};
