import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faUser,
  faIdCard,
} from "@fortawesome/free-solid-svg-icons";
import { DropzoneComponent } from "./DropzoneComponent";
import { useCallback } from "react";
import type { FileRejection } from "react-dropzone";

export const VerificationIDForm = () => {
  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      console.log("Archivos aceptados:", acceptedFiles);
      console.log("Archivos rechazados:", fileRejections);
    },
    []
  );

  return (
    <div className="w-full p-5">
      <h2 className="font-bold text-center text-lg">
        Escaneo del documento de identidad
      </h2>

      <div className="mt-5 flex flex-row gap-10 md:gap-8 sm:gap-5 p-2 justify-between">
        <div className="ml-5 min-w-[200px] max-w-[280px] hover:cursor-pointer flex flex-col gap-3 border-gray-300 border-2 px-2 py-8 rounded-md hover:bg-gray-100">
          <span className="w-full flex justify-center items-center">
            <FontAwesomeIcon icon={faAddressCard} size="3x" color="#a3a3a3" />
          </span>

          <div className="flex flex-col gap-1 mt-2 px-5">
            <h3 className="font-medium text-center">Frente</h3>
            <p className="font-normal text-center text-gray-700">
              Captura el documento por el frente
            </p>
          </div>

          <button className="mt-2 p-1 mx-auto rounded-full border-2 border-[#3466cc] max-w-[110px] min-w-[90px] hover:bg-gray-300 hover:border-gray-300 hover:text-white duration-200 hover:cursor-pointer">
            <DropzoneComponent
              text={"Capturar"}
              onDrop={onDrop}
              selectorClasses={
                "text-[#3466cc] hover:text-white font-medium hover:cursor-pointer"
              }
              identi="111"
            />
          </button>
        </div>

        <div className="mb-3 min-w-[140px] hover:gray-100  border-gray-300 border-2 hover:bg-gray-200 hover:cursor-pointer p-5 rounded-md flex flex-col items-center justify-center gap-3">
          <span className="bg-[#f1f3f5] p-[16px] rounded-md inline-block">
            <FontAwesomeIcon icon={faUser} size="2x" color="gray" />
          </span>

          <DropzoneComponent
            text={"Identificación del rostro"}
            onDrop={onDrop}
            selectorClasses={"text-gray-900 text-lg text-center"}
            identi="222"
          />
        </div>

        <div className="mr-5 min-w-[200px] max-w-[280px] hover:cursor-pointer flex flex-col gap-3 border-gray-300 border-2 px-2 py-8 rounded-md hover:bg-gray-100">
          <span className="w-full flex justify-center items-center">
            <FontAwesomeIcon icon={faIdCard} size="3x" color="#a3a3a3" />
          </span>

          <div className="flex flex-col gap-1 mt-2 px-5">
            <h3 className="font-medium text-center">Respaldo</h3>
            <p className="font-normal text-center text-gray-700">
              Captura el documento por el respaldo
            </p>
          </div>

          <button className="mt-2 p-1 mx-auto rounded-full border-2 border-[#3466cc] max-w-[110px] min-w-[90px] hover:bg-gray-300 hover:border-gray-300 hover:text-white duration-200 hover:cursor-pointer">
            <DropzoneComponent
              text={"Capturar"}
              onDrop={onDrop}
              selectorClasses={
                "text-[#3466cc] hover:text-white font-medium hover:cursor-pointer"
              }
              identi="333"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
