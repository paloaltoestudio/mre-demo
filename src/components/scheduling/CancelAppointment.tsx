import { type Dispatch, type SetStateAction } from "react";
import { Modal } from "../Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

type CancelAppointmentProps = {
  isOpenCancel: boolean;
  setIsOpenCancel: Dispatch<SetStateAction<boolean>>;
  setRequestRemove: Dispatch<SetStateAction<boolean>>;
};

export const CancelAppointment = ({
  isOpenCancel,
  setIsOpenCancel,
  setRequestRemove,
}: CancelAppointmentProps) => {
  return (
    <Modal
      isOpen={isOpenCancel}
      setIsOpen={setIsOpenCancel}
      content={
        <div className="w-[450px] bg-white border border-gray-100 rounded-lg shadow-lg p-6 flex flex-col gap-1 items-center">
          <span className="w-[50px] h-[50px] flex justify-center items-center">
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              className="text-orange-700 bg-orange-100 rounded-full p-3"
            />
          </span>

          <h2 className="text-lg font-medium text-center mt-10">
            ¿Está seguro de cancelar la cita?
          </h2>

          <p className="text-center mt-2">
            Se eliminará la información correspondiente a la "Cita"
          </p>

          <div className="flex gap-3 mt-7">
            <button
              type="button"
              onClick={() => {
                setIsOpenCancel(false);
              }}
              className="p-3 border-orange-700 text-orange-700 font-medium bg-white border-1 duration-150 hover:bg-orange-200 hover:cursor-pointer rounded-full min-w-[100px]"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => setRequestRemove(true)}
              className="p-3 border-orange-700 font-medium bg-orange-700 hover:bg-orange-800 duration-150 text-white rounded-full hover:cursor-pointer min-w-[100px]"
            >
              Aceptar
            </button>
          </div>
        </div>
      }
    />
  );
};
