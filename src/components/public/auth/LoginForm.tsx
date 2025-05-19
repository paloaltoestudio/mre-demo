import { useState, type Dispatch, type SetStateAction } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { documentsType } from "../../../mocks/authMocks/LoginMock";
import { Captcha } from "./Captcha";

type LoginFormProps = {
  typeUser: string;
  setTypeUser: Dispatch<SetStateAction<"Ciudadano" | "Funcionario">>;
};

export const LoginForm = ({ typeUser, setTypeUser }: LoginFormProps) => {
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [hasValue, setHasValue] = useState(false);
  const [catpchaState, setCatpchaState] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  const [watchTipoDocumento, watchNumeroDocumento] = useWatch({
    control,
    name: ["document-type", "documentNumber"],
  });

  const onChangeCaptcha = (value: string | null) => {
    if (value !== null) {
      setCatpchaState(true);
    }
  };

  const isFormValid =
    catpchaState &&
    watchTipoDocumento &&
    watchNumeroDocumento &&
    watchNumeroDocumento.trim() !== "";

  return (
    <div className="mb-4 w-full">
      <div id="type-user" className="border-b-2 border-gray-300 w-full">
        <nav id="nav-type-user" className="">
          <ul className="flex gap-4 justify-center">
            {["Ciudadano", "Funcionario"].map((type) => (
              <li
                key={type}
                onClick={() => setTypeUser(type as "Ciudadano" | "Funcionario")}
                className={`p-2 cursor-pointer border-b-2 transition-colors font-normal
              ${
                typeUser === type
                  ? "text-[#3466cc] border-[#3466cc]"
                  : "border-transparent text-black hover:text-[#3466cc] hover:border-[#3466cc]"
              }`}
              >
                {type}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div
        id="login-fields"
        className="w-full p-3 flex flex-col justify-center items-center mt-5"
      >
        <h2 className="font-medium text-lg text-center">Iniciar sesión</h2>
        <select
          id="document-type"
          className={`mt-5 border p-2 rounded w-11/12 ${
            tipoDocumento === "" ? "text-gray-400" : "text-black"
          }
          ${errors.documentNumber ? "border-black" : ""}`}
          {...register("document-type", {
            required: "Campo requerido",
            onChange: (e) => {
              setTipoDocumento(e.target.value);
            },
          })}
        >
          <option value="" disabled>
            Tipo de documento
          </option>
          {documentsType.map((doc, index) => (
            <option key={`${doc.value}-${index}`} value={doc.value}>
              {doc.label}
            </option>
          ))}
        </select>
        <input
          id="document-number"
          type="number"
          placeholder="Número de documento"
          className={`mt-4 border p-2 rounded w-11/12 transition-colors placeholder-gray-400
        ${errors.documentNumber ? "border-black" : ""}
        ${
          hasValue ? "text-black border-black" : "text-gray-400 border-gray-400"
        }
      `}
          {...register("documentNumber", {
            required: "Campo requerido",
            pattern: {
              value: /^[0-9]+$/,
              message: "El número de documento solo puede contener números",
            },
            onChange: (e) => {
              setHasValue(e.target.value !== "");
            },
          })}
        />
      </div>
      <div id="captcha-login-content" className="w-full flex mt-2">
        <Captcha onChangeCaptcha={onChangeCaptcha} />
      </div>
      <div
        id="buttons-login"
        className="w-full p-2 flex flex-col justify-center items-center gap-3 mt-5"
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
        <button
          className={`w-11/12 p-2 flex flex-col justify-center items-center rounded-full text-[#3466cc] border-1 border-[#3466cc] text-md hover:cursor-pointer`}
        >
          Registrarse
        </button>
      </div>
    </div>
  );
};
