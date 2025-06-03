import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type VerificationCodeProps = {
  title: string;
  site: string;
  resendCode?: () => void;
};

export const VerificationCard = ({
  title,
  site,
  resendCode,
}: VerificationCodeProps) => {
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

  const length = 6;
  const [code, setCode] = useState(Array(length).fill(""));

  useEffect(() => {
    setCode(Array(length).fill(""));
  }, []);

  const [codeArray, setCodeArray] = useState(code);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    setValue("code", codeArray.join(""));
  }, [codeArray, setValue]);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;

    const updated = [...codeArray];
    updated[index] = value;
    setCodeArray(updated);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key, ctrlKey, metaKey, currentTarget } = e; 

    if ((ctrlKey || metaKey) && key === "v") {
      return;
    }

    if ((ctrlKey || metaKey) && (key === "a" || key === "c" || key === "x")) {
      return;
    }

    const allowedKeys = [
      "Backspace",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
      "Tab",
    ];

    if (!allowedKeys.includes(key) && !/^[0-9]$/.test(key)) {
      e.preventDefault();
    }

    const index = parseInt(currentTarget.dataset.index || "0");
    if (key === "Backspace" && currentTarget.value === "" && index > 0) {
      e.preventDefault();
      const updated = [...codeArray];
      updated[index - 1] = "";
      setCodeArray(updated);
      inputRefs.current[index - 1]?.focus();
    } else if (
      key === "Delete" &&
      currentTarget.value !== "" &&
      index < length - 1
    ) {
    } else if (key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    startIndex: number
  ) => {
    e.preventDefault();

    const paste = e.clipboardData.getData("text").replace(/\D/g, "");
    const digits = paste.split("").slice(0, length);

    if (digits.length === 0) return;

    const newCodeArray = [...codeArray];

    digits.forEach((digit, i) => {
      const index = startIndex + i;
      if (index < length) {
        newCodeArray[index] = digit;
        const ref = inputRefs.current[index];
        if (ref) ref.value = digit;
      }
    });

    setCodeArray(newCodeArray);

    const focusIndex = Math.min(startIndex + digits.length, length - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  const changeMethod = () => {
    navigate("/auth/verification-code");
    console.log("Cambiar método de verificación");
  };

  return (
    <div
      id="auth-verication-card"
      className="p-10 flex flex-col items-center justify-center"
    >
      <h3 className="flex flex-col">
        <span className="text-center font-medium">{title}</span>
        <span
          onClick={changeMethod}
          className="flex text-gray-500 justify-center text-center hover:text-gray-600 underline gap-2 hover:cursor-pointer"
        >
          {site} <FontAwesomeIcon icon={faPen} className="w-3.5 pt-1" />
        </span>
      </h3>

      <h4 className="w-full mt-7 text-center">Ingresar código</h4>

      <div className="mt-2 flex gap-3 justify-center">
        {codeArray.map((digit, index) => {
          const { ref, ...rest } = register(`digit-${digit}-${index}`);

          return (
            <input
              key={index}
              {...rest}
              ref={(el) => {
                inputRefs.current[index] = el;

                if (typeof ref === "function") {
                  ref(el);
                } else if (ref && typeof ref === "object" && "current" in ref) {
                  (ref as { current: HTMLInputElement | null }).current = el;
                }
              }}
              type="text"
              maxLength={1}
              inputMode="numeric"
              pattern="[0-9]*"
              onChange={(e) => handleChange(index, e.target.value)}
              className={`w-[40px] h-[40px] text-center text-[24px] rounded-md border border-gray-400 hover:border-[#3466cc] focus:border-[#3466cc] focus:border-2 outline-none ${
                errors.code && "border-red-500"
              }`}
              onKeyDown={handleKeyDown}
              onPaste={(e) => handlePaste(e, index)}
            />
          );
        })}
      </div>

      <input
        type="hidden"
        {...register("code", {
          required: "El código es obligatorio",
          minLength: {
            value: 6,
            message: "El código debe tener 6 dígitos",
          },
          maxLength: {
            value: 6,
            message: "El código debe tener 6 dígitos",
          },
        })}
      />

      <button
        type="submit"
        className="mt-[20px] w-full p-2 bg-[#3466cc] text-white font-bold rounded-full hover:cursor-pointer hover:bg-[#3734cc]"
      >
        Continuar
      </button>

      <p
        onClick={resendCode}
        className="mt-[10px] text-[#3466cc] hover:text-[#3734cc] hover:cursor-pointer text-center underline"
      >
        Reenviar código &#x21bb;
      </p>
    </div>
  );
};
