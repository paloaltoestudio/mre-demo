import type { Dispatch, SetStateAction } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Link } from "react-router-dom";

type LoginPasswordFormProps = {
  typeUser: "Ciudadano" | "Funcionario";
  setPasswordView: Dispatch<SetStateAction<boolean>>;
};

export const LoginPasswordForm = ({
  typeUser,
  setPasswordView,
}: LoginPasswordFormProps) => {
  const {
    formState: { errors },
    register,
    control,
  } = useFormContext();

  const [watchPassword] = useWatch({
    control,
    name: ["password"],
  });

  return (
    <div className="mb-4 w-full">
      <div
        id="type-user"
        className="border-b-2 border-gray-300 w-full flex justify-center"
      >
        <h2 className="text-center p-3 font-medium">{typeUser}</h2>
      </div>

      <div
        id="login-fields"
        className="w-full p-3 flex flex-col justify-center items-center mt-5"
      >
        <h2 className="font-medium text-lg text-center">Iniciar sesión</h2>

        <input
          id="password"
          type="password"
          placeholder="Contraseña"
          className={`mt-4 border p-2 rounded w-11/12 transition-colors placeholder-gray-400 border-gray-400
              ${errors.password && "border-black"}
            `}
          {...register("password", {
            required: "Campo requerido",
            // onChange: (e) => {
            //   setHasValue(e.target.value !== "");
            // },
          })}
        />
        <Link to={"/auth/forgot-password"} className="ml-auto pr-5 mt-1">
          {" "}
          <span className="text-[#3466cc] underline text-sm font-medium">
            {" "}
            Olvidé mi contraseña
          </span>
        </Link>
      </div>

      <div
        id="buttons-login-password"
        className="w-full p-2 flex flex-col justify-center items-center gap-3 mt-5"
      >
        <button
          className={`w-11/12 p-2 flex flex-col justify-center items-center mt-2 rounded-full hover:cursor-pointer ${
            watchPassword
              ? "text-md bg-[#3366cc] text-white "
              : "bg-gray-300 text-gray-400 text-md hover:bg-gray-400 hover:text-white"
          }`}
          type="submit"
        >
          Continuar
        </button>
        <Link
          to={"/auth"}
          onClick={() => setPasswordView(false)}
          className="mx-auto"
        >
          <span className="text-gray-900 underline text-sm font-medium">
            Regresar
          </span>
        </Link>
      </div>
    </div>
  );
};
