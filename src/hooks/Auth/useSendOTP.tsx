// // src/hooks/useSendOTP.ts
// import { useEffect } from "react";
// import { useMutation } from "@tanstack/react-query";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faCircleCheck,
//   faCircleExclamation,
// } from "@fortawesome/free-solid-svg-icons";
// import type { ResponseOTPType } from "../../types/auth/OTPTypes";
// import { postPublicRequest } from "../../services/fetchingService";
// import { CreateOTPSchema } from "../../schemas/Auth/OTPSchemas";

// type UseSendOTPParams = {
//   submitted: string | null;
//   externalId: string | null;
//   setOtp: (otp: string | null) => void;
// };

// export const SendOTP = ({
//   submitted,
//   externalId,
//   setOtp,
// }: UseSendOTPParams) => {
//   const navigate = useNavigate();

//   const { mutateAsync } = useMutation({
//     mutationFn: postPublicRequest<ResponseOTPType>,
//     onSuccess: (response: ResponseOTPType) => {
//       setOtp(response?.data?.otp || null);
//       toast.success("Código enviado", {
//         icon: (
//           <FontAwesomeIcon icon={faCircleCheck} className="text-green-500" />
//         ),
//         autoClose: 2000,
//         draggable: true,
//         hideProgressBar: true,
//         className: "border-l-5 border-green-500 bg-white text-black shadow-md",
//       });

//       setTimeout(() => {
//         const thisMethod = JSON.parse(submitted!);
//         navigate("/auth/verification-code/" + thisMethod.type);
//       }, 2000);
//     },
//     onError: () => {
//       toast.error("Ocurrió un error en el envío del código de verificación", {
//         icon: (
//           <FontAwesomeIcon
//             icon={faCircleExclamation}
//             className="text-red-500"
//           />
//         ),
//         autoClose: 1000,
//         draggable: true,
//         hideProgressBar: true,
//         className: "border-l-5 border-red-500 bg-white text-black shadow-md",
//       });
//     },
//   });

//   useEffect(() => {
//     handleOTP();
//   }, []);

//   const handleOTP = async () => {
//     if (externalId) {
//       const body = {
//         userId: externalId,
//         type: submitted?.trim(),
//       };

//       await mutateAsync({
//         url: "/Token/otp/send",
//         schema: CreateOTPSchema,
//         body,
//       });
//     }
//   };

//   return { handleOTP };
// };

// // src/hooks/useSendOTP.ts
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import type { ResponseOTPType } from "../../types/auth/OTPTypes";
import { postPublicRequest } from "../../services/fetchingService";
import { CreateOTPSchema } from "../../schemas/Auth/OTPSchemas";

type UseSendOTPParams = {
  setOtp: (otp: string | null) => void;
  shouldNavigate?: boolean;
};

type SendOTPParams = {
  url: string;
  schema: any;
  body: {
    userId: string;
    type: string;
  };
};

export const useSendOTP = ({ setOtp, shouldNavigate = true }: UseSendOTPParams) => {
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation<
    ResponseOTPType['data'],
    unknown,
    SendOTPParams
  >({
    mutationFn: postPublicRequest<ResponseOTPType['data']>,
    onSuccess: (response, variables) => {
      console.log("OTP sent successfully:", response);
      setOtp(response?.otp);
      
      toast.success("Código enviado", {
        icon: (
          <FontAwesomeIcon icon={faCircleCheck} className="text-green-500" />
        ),
        autoClose: 2000,
        draggable: true,
        hideProgressBar: true,
        className: "border-l-5 border-green-500 bg-white text-black shadow-md",
      });

      // Solo navegar si shouldNavigate es true
      if (shouldNavigate) {
        const type = variables?.body?.type;
        if (type) {
          console.log("🧭 Navegando a:", "/auth/verification-code/" + type);
          setTimeout(() => {
            navigate("/auth/verification-code/" + type);
          }, 1000);
        }
      } else {
        console.log("🚫 Navegación automática deshabilitada");
      }
    },
    onError: () => {
      toast.error("Ocurrió un error en el envío del código de verificación", {
        icon: (
          <FontAwesomeIcon
            icon={faCircleExclamation}
            className="text-red-500"
          />
        ),
        autoClose: 1000,
        draggable: true,
        hideProgressBar: true,
        className: "border-l-5 border-red-500 bg-white text-black shadow-md",
      });
    },
  });

  const sendOTP = async (externalId: string, submitted: string) => {
    if (!externalId || !submitted?.trim()) return;

    const body = {
      userId: externalId,
      type: submitted.trim(),
    };

    await mutateAsync({
      url: "/Token/otp/send",
      schema: CreateOTPSchema,
      body,
    });
  };

  return { sendOTP, isPending };
};
