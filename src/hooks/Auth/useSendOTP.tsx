// src/hooks/useSendOTP.ts
import { useEffect } from "react";
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
  submitted: string | null;
  externalId: string | null;
  setOtp: (otp: string | null) => void;
};

export const useSendOTP = ({
  submitted,
  externalId,
  setOtp,
}: UseSendOTPParams) => {
  const navigate = useNavigate();

  const { mutateAsync } = useMutation({
    mutationFn: postPublicRequest<ResponseOTPType>,
    onSuccess: (response: ResponseOTPType) => {
      setOtp(response?.data?.otp || null);
      toast.success("Código enviado", {
        icon: (
          <FontAwesomeIcon icon={faCircleCheck} className="text-green-500" />
        ),
        autoClose: 2000,
        draggable: true,
        hideProgressBar: true,
        className: "border-l-5 border-green-500 bg-white text-black shadow-md",
      });

      setTimeout(() => {
        const thisMethod = JSON.parse(submitted!);
        navigate("/auth/verification-code/" + thisMethod.type);
      }, 2000);
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

  useEffect(() => {
    handleOTP();
  }, []);

  const handleOTP = async () => {
    if (externalId) {
      const body = {
        userId: externalId,
        type: submitted?.trim(),
      };

      await mutateAsync({
        url: "/Token/otp/send",
        schema: CreateOTPSchema,
        body,
      });
    }
  };
};
